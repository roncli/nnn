/**
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

const Common = require("../includes/common"),
    LinksView = require("../../public/views/links");

//  #        #           #
//  #                    #
//  #       ##    # ##   #   #   ###
//  #        #    ##  #  #  #   #
//  #        #    #   #  ###     ###
//  #        #    #   #  #  #       #
//  #####   ###   #   #  #   #  ####
/**
 * A class that represents the links page.
 */
class Links {
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
            {},
            LinksView.get(),
            req
        ));
    }
}

Links.route = {
    path: "/links"
};

module.exports = Links;
