/**
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

const Common = require("../includes/common"),
    AboutView = require("../../public/views/about"),
    RouterBase = require("hot-router").RouterBase;

//    #    #                     #
//   # #   #                     #
//  #   #  # ##    ###   #   #  ####
//  #   #  ##  #  #   #  #   #   #
//  #####  #   #  #   #  #   #   #
//  #   #  ##  #  #   #  #  ##   #  #
//  #   #  # ##    ###    ## #    ##
/**
 * A class that represents the about page.
 */
class About extends RouterBase {
    //                    #
    //                    #
    // ###    ##   #  #  ###    ##
    // #  #  #  #  #  #   #    # ##
    // #     #  #  #  #   #    ##
    // #      ##    ###    ##   ##
    /**
     * Retrieves the route parameters for the class.
     * @returns {RouterBase.Route} The route parameters.
     */
    static get route() {
        const route = {...super.route};

        route.path = "/about";

        return route;
    }

    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Processes the request.
     * @param {Express.Request} req The request.
     * @param {Express.Response} res The response.
     * @returns {void}
     */
    static get(req, res) {
        res.status(200).send(Common.page(
            "",
            {css: ["/css/about.css"]},
            AboutView.get(),
            req
        ));
    }
}

module.exports = About;
