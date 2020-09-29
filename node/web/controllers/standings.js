/**
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

const Common = require("../includes/common"),
    Player = require("../../src/models/player"),
    Season = require("../../src/models/season"),
    StandingsView = require("../../public/views/standings");

//   ###    #                       #    #
//  #   #   #                       #
//  #      ####    ###   # ##    ## #   ##    # ##    ## #   ###
//   ###    #         #  ##  #  #  ##    #    ##  #  #  #   #
//      #   #      ####  #   #  #   #    #    #   #   ##     ###
//  #   #   #  #  #   #  #   #  #  ##    #    #   #  #          #
//   ###     ##    ####  #   #   ## #   ###   #   #   ###   ####
//                                                   #   #
//                                                    ###
/**
 * A class that represents the standings page.
 */
class Standings {
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
            seasonList = await Season.getSeasonNumbers(),
            standings = await Player.getSeasonStandings(season);

        res.status(200).send(Common.page(
            "",
            {css: ["/css/standings.css"]},
            StandingsView.get({
                standings,
                seasonList,
                season
            }),
            req
        ));
    }
}

Standings.route = {
    path: "/standings"
};

module.exports = Standings;
