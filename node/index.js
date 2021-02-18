const compression = require("compression"),
    express = require("express"),
    Log = require("node-application-insights-logger"),
    tz = require("timezone-js"),
    tzdata = require("tzdata"),
    util = require("util"),

    Discord = require("./src/discord"),
    Minify = require("./src/minify"),
    Router = require("./src/router");

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

    // Get the router.
    /** @type {express.Router} */
    let router;
    try {
        router = await Router.getRouter();
    } catch (err) {
        Log.critical("There was an error while setting up the router.", {err});
        return;
    }

    tz.timezone.loadingScheme = tz.timezone.loadingSchemes.MANUAL_LOAD;
    tz.timezone.loadZoneDataFromObject(tzdata);

    // Startup Discord.
    Discord.startup();
    await Discord.connect();

    // Initialize middleware stack.
    app.use(compression());

    // Setup public redirects.
    app.use(express.static("public"));

    app.use((req, res, next) => {
        req.ip = (req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].toString() : void 0) || req.ip;
        next();
    });

    // Setup Discord redirect.
    app.get("/discord", (req, res) => {
        res.redirect(process.env.NNN_DISCORD_URL);
    });

    // Setup JS/CSS handlers.
    app.get("/css", Minify.cssHandler);
    app.get("/js", Minify.jsHandler);

    // 500 is an internal route, 404 it if it's requested directly.
    app.use("/500", (req, res, next) => {
        req.method = "GET";
        req.url = "/404";
        router(req, res, next);
    });

    // Setup dynamic routing.
    app.use("/", router);

    // 404 remaining pages.
    app.use((req, res, next) => {
        req.method = "GET";
        req.url = "/404";
        router(req, res, next);
    });

    // 500 errors.
    app.use((err, req, res, next) => {
        Log.error("Unhandled error has occurred.", {err});
        req.method = "GET";
        req.url = "/500";
        router(req, res, next);
    });

    // Startup web server.
    const port = process.env.PORT || 3030;

    app.listen(port);
    Log.info(`Server PID ${process.pid} listening on port ${port}.`);
}());
