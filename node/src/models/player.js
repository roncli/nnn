/**
 * @typedef {import("../../types/playerTypes").Career} PlayerTypes.Career
 * @typedef {import("../../types/playerTypes").Player} PlayerTypes.Player
 * @typedef {import("../../types/playerTypes").SeasonStanding} PlayerTypes.SeasonStanding
 * @typedef {import("../../types/playerTypes").SeasonStats} PlayerTypes.SeasonStats
 */

const Db = require("../database/player"),
    Exception = require("../logging/exception"),
    SeasonDb = require("../database/season");

// ###   ##
// #  #   #
// #  #   #     ###  #  #   ##   ###
// ###    #    #  #  #  #  # ##  #  #
// #      #    # ##   # #  ##    #
// #     ###    # #    #    ##   #
//                    #
/**
 * A class that represents a player.
 */
class Player {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets a player by player ID.
     * @param {number} id The player ID.
     * @returns {Promise<PlayerTypes.Player>} A promise that resolves with the player.
     */
    static async get(id) {
        try {
            return await Db.get(id);
        } catch (err) {
            throw new Exception("There was a database error retrieving a player by player ID.", err);
        }
    }

    //              #    ###         ###    #                                #  ###      #
    //              #    #  #        #  #                                    #   #       #
    //  ###   ##   ###   ###   #  #  #  #  ##     ###    ##    ##   ###    ###   #     ###
    // #  #  # ##   #    #  #  #  #  #  #   #    ##     #     #  #  #  #  #  #   #    #  #
    //  ##   ##     #    #  #   # #  #  #   #      ##   #     #  #  #     #  #   #    #  #
    // #      ##     ##  ###     #   ###   ###   ###     ##    ##   #      ###  ###    ###
    //  ###                     #
    /**
     * Gets a player by Discord ID.
     * @param {string} id The Discord ID.
     * @returns {Promise<PlayerTypes.Player>} A promise that resolves with the player.
     */
    static async getByDiscordId(id) {
        try {
            return await Db.getByDiscordId(id);
        } catch (err) {
            throw new Exception("There was a database error retrieving a player by Discord ID.", err);
        }
    }

    //              #     ##
    //              #    #  #
    //  ###   ##   ###   #      ###  ###    ##    ##   ###
    // #  #  # ##   #    #     #  #  #  #  # ##  # ##  #  #
    //  ##   ##     #    #  #  # ##  #     ##    ##    #
    // #      ##     ##   ##    # #  #      ##    ##   #
    //  ###
    /**
     * Gets the career for a player, and some advanced stats for a single season.
     * @param {number} playerId The player ID.
     * @param {number} season The season.
     * @returns {Promise<PlayerTypes.Career>} A promise that resolves with the player's career stats.
     */
    static async getCareer(playerId, season) {
        try {
            return await Db.getCareer(playerId, season);
        } catch (err) {
            throw new Exception("There was a database error retrieving a player's career.", err);
        }
    }

    //              #     ##                                   ##    #                   #   #
    //              #    #  #                                 #  #   #                   #
    //  ###   ##   ###    #     ##    ###   ###    ##   ###    #    ###    ###  ###    ###  ##    ###    ###   ###
    // #  #  # ##   #      #   # ##  #  #  ##     #  #  #  #    #    #    #  #  #  #  #  #   #    #  #  #  #  ##
    //  ##   ##     #    #  #  ##    # ##    ##   #  #  #  #  #  #   #    # ##  #  #  #  #   #    #  #   ##     ##
    // #      ##     ##   ##    ##    # #  ###     ##   #  #   ##     ##   # #  #  #   ###  ###   #  #  #     ###
    //  ###                                                                                              ###
    /**
     * Gets the standings for a season.
     * @param {number} [season] The season.  Defaults to the current season.
     * @returns {Promise<PlayerTypes.SeasonStanding[]>} The season standings.
     */
    static async getSeasonStandings(season) {
        if (!season) {
            try {
                season = (await SeasonDb.getFromDate(new Date()))._id;
            } catch (err) {
                throw new Exception("There was a database error getting the latest season for the season standings.", err);
            }
        }

        try {
            return await Db.getSeasonStandings(season);
        } catch (err) {
            throw new Exception("There was a database error getting the season standings.", err);
        }
    }

    //              #     ##    #           #           ####              ###                            #     ##
    //              #    #  #   #           #           #                 #  #                           #    #  #
    //  ###   ##   ###    #    ###    ###  ###    ###   ###    ##   ###   #  #   ##    ##    ##   ###   ###    #     ##    ###   ###    ##   ###
    // #  #  # ##   #      #    #    #  #   #    ##     #     #  #  #  #  ###   # ##  #     # ##  #  #   #      #   # ##  #  #  ##     #  #  #  #
    //  ##   ##     #    #  #   #    # ##   #      ##   #     #  #  #     # #   ##    #     ##    #  #   #    #  #  ##    # ##    ##   #  #  #  #
    // #      ##     ##   ##     ##   # #    ##  ###    #      ##   #     #  #   ##    ##    ##   #  #    ##   ##    ##    # #  ###     ##   #  #
    //  ###
    /**
     * Gets the most recent season's stats for a player.
     * @param {number} id The player ID.
     * @returns {Promise<PlayerTypes.SeasonStats>} A promise that resolves with the stats for the recent season.
     */
    static async getStatsForRecentSeason(id) {
        try {
            return await Db.getStatsForRecentSeason(id);
        } catch (err) {
            throw new Exception("There was a database error retrieving a player's stats for a recent season.", err);
        }
    }

    //                         ####              ###    #                                #   ##   #                             ##
    //                         #                 #  #                                    #  #  #  #                              #
    // ###    ###  # #    ##   ###    ##   ###   #  #  ##     ###    ##    ##   ###    ###  #     ###    ###  ###   ###    ##    #
    // #  #  #  #  ####  # ##  #     #  #  #  #  #  #   #    ##     #     #  #  #  #  #  #  #     #  #  #  #  #  #  #  #  # ##   #
    // #  #  # ##  #  #  ##    #     #  #  #     #  #   #      ##   #     #  #  #     #  #  #  #  #  #  # ##  #  #  #  #  ##     #
    // #  #   # #  #  #   ##   #      ##   #     ###   ###   ###     ##    ##   #      ###   ##   #  #   # #  #  #  #  #   ##   ###
    /**
     * Gets the player's name for use in a Discord channel name.
     * @param {PlayerTypes.Player} player The player.
     * @returns {string} The player's name for use in a Discord channel name.
     */
    static nameForDiscordChannel(player) {
        const name = (player.name || "").replace(/[^a-z0-9]/gi, "");

        if (name === "") {
            return player.discordId.replace(/[^0-9]/g, "");
        }

        return name;
    }
}

module.exports = Player;
