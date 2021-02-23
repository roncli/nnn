/**
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

const Challenge = require("../../src/models/challenge"),
    RouterBase = require("hot-router").RouterBase;

//  #   #          #            #        #             #
//  #   #          #            #       # #
//  ## ##   ###   ####    ###   # ##   #   #  # ##    ##
//  # # #      #   #     #   #  ##  #  #   #  ##  #    #
//  #   #   ####   #     #      #   #  #####  ##  #    #
//  #   #  #   #   #  #  #   #  #   #  #   #  # ##     #
//  #   #   ####    ##    ###   #   #  #   #  #       ###
//                                            #
//                                            #
/**
 * A class that represents the Match API.
 */
class MatchApi extends RouterBase {
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

        route.path = "/api/match";

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
     * @returns {Promise} A promise that resolves when the request is complete.
     */
    static async get(req, res) {
        const querySeason = req.query.season && req.query.season.toString() || void 0,
            season = Number.parseInt(querySeason, 10) || void 0,
            queryPage = req.query.page && req.query.page.toString() || void 0,
            page = Number.parseInt(queryPage, 10) || void 0;

        if (!season) {
            return res.status(400).json({error: "Invalid season."});
        }

        if (!page) {
            return res.status(400).json({error: "Invalid season."});
        }

        return res.json(await (await Challenge.getMatchesBySeason(season, page)).map((m) => ({match: m})));
    }
}

module.exports = MatchApi;
