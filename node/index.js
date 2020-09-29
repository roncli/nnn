const compression = require("compression"),
    express = require("express"),
    minify = require("./src/minify"),
    tz = require("timezone-js"),
    tzdata = require("tzdata"),

    Discord = require("./src/discord"),
    Log = require("./src/logging/log"),
    Router = require("./src/router");

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
    Log.log("Starting up...");

    // Set title.
    if (process.platform === "win32") {
        process.title = "Noita Nemesis Nation";
    } else {
        process.stdout.write("\x1b]2;Noita Nemesis Nation\x1b\x5c");
    }

    // Setup express app.
    const app = express();

    // Get the router.
    /** @type {express.Router} */
    let router;
    try {
        router = await Router.getRouter();
    } catch (err) {
        console.log(err);
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
    app.get("/css", minify.cssHandler);
    app.get("/js", minify.jsHandler);

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
        Log.exception("Unhandled error has occurred.", err);
        req.method = "GET";
        req.url = "/500";
        router(req, res, next);
    });

    // Startup web server.
    const port = process.env.PORT || 3030;

    app.listen(port);
    console.log(`Server PID ${process.pid} listening on port ${port}.`);
}());

process.on("unhandledRejection", (reason) => {
    Log.exception("Unhandled promise rejection caught.", reason);
});
