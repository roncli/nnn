const Db = require("../database/season"),
    Exception = require("../errors/exception");

//   ###
//  #   #
//  #       ###    ###    ###    ###   # ##
//   ###   #   #      #  #      #   #  ##  #
//      #  #####   ####   ###   #   #  #   #
//  #   #  #      #   #      #  #   #  #   #
//   ###    ###    ####  ####    ###   #   #
/**
 * A class that represents seasons.
 */
class Season {
    //              #     ##                                  #  #              #
    //              #    #  #                                 ## #              #
    //  ###   ##   ###    #     ##    ###   ###    ##   ###   ## #  #  #  # #   ###    ##   ###    ###
    // #  #  # ##   #      #   # ##  #  #  ##     #  #  #  #  # ##  #  #  ####  #  #  # ##  #  #  ##
    //  ##   ##     #    #  #  ##    # ##    ##   #  #  #  #  # ##  #  #  #  #  #  #  ##    #       ##
    // #      ##     ##   ##    ##    # #  ###     ##   #  #  #  #   ###  #  #  ###    ##   #     ###
    //  ###
    /**
     * Gets the season numbers.
     * @returns {Promise<number[]>} A promise that resolves with a list of season numbers.
     */
    static async getSeasonNumbers() {
        try {
            return await Db.getSeasonNumbers();
        } catch (err) {
            throw new Exception("There was a database error getting the list of season numbers.", err);
        }
    }
}

module.exports = Season;
