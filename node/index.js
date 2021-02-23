const compression = require("compression"),
    express = require("express"),
    HotRouter = require("hot-router"),
    Log = require("node-application-insights-logger"),
    Minify = require("node-minify"),
    path = require("path"),
    tz = require("timezone-js"),
    tzdata = require("tzdata"),
    util = require("util"),

    Cache = require("./src/redis/cache"),
    Discord = require("./src/discord");

process.on("unhandledRejection", (reason) => {
    Log.error("Unhandled promise rejection caught.", {err: reason instanceof Error ? reason : new Error(util.inspect(reason))});
});

//         #                 #
//         #                 #
//  ###   ###    ###  ###   ###   #  #  ###
// ##      #    #  #  #  #   #    #  #  #  #
//   ##    #    # ##  #      #    #  #  #  #
// ###      ##   # #  #       ##   ###  ###
//                                      #
/**
 * Starts up the application.
 */
(async function startup() {
    // Setup application insights.
    if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY !== "") {
        Log.setupApplicationInsights(process.env.APPINSIGHTS_INSTRUMENTATIONKEY, {application: "nnn", container: "nnn-node"});
    }

    Log.info("Starting up...");

    // Set title.
    if (process.platform === "win32") {
        process.title = "Noita Nemesis Nation";
    } else {
        process.stdout.write("\x1b]2;Noita Nemesis Nation\x1b\x5c");
    }

    // Setup express app.
    const app = express();

    // Remove powered by.
    app.disable("x-powered-by");

    // Load timezones.
    tz.timezone.loadingScheme = tz.timezone.loadingSchemes.MANUAL_LOAD;
    tz.timezone.loadZoneDataFromObject(tzdata);

    // Startup Discord.
    Discord.startup();
    await Discord.connect();

    // Initialize middleware stack.
    app.use(compression());

    // Correct IP from web server.
    app.use((req, res, next) => {
        req.ip = (req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].toString() : void 0) || req.ip;
        next();
    });

    // Setup public redirects.
    app.use(express.static("public"));

    // Setup Discord redirect.
    app.get("/discord", (req, res) => {
        res.redirect(process.env.NNN_DISCORD_URL);
    });

    // Setup minification.
    Minify.setup({
        cssRoot: "/css/",
        jsRoot: "/js/",
        wwwRoot: path.join(__dirname, "public"),
        caching: process.env.MINIFY_CACHE ? {
            get: Cache.get,
            set: (key, value) => Cache.add(key, value, new Date(new Date().getTime() + 86400000)),
            prefix: process.env.REDIS_PREFIX
        } : void 0,
        disable: !process.env.MINIFY_ENABLED
    });
    app.get("/css", Minify.cssHandler);
    app.get("/js", Minify.jsHandler);

    // Setup hot-router.
    const router = new HotRouter.Router();
    router.on("error", (data) => {
        Log.error(data.message, {err: data.err, req: data.req});
    });
    try {
        app.use("/", await router.getRouter(path.join(__dirname, "web"), {hot: false}));
    } catch (err) {
        Log.critical("Could not set up routes.", {err});
    }

    // Startup web server.
    const port = process.env.PORT || 3030;

    app.listen(port);
    Log.info(`Server PID ${process.pid} listening on port ${port}.`);
}());
