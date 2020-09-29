//  #####   ##
//  #        #
//  #        #     ###
//  ####     #    #   #
//  #        #    #   #
//  #        #    #   #
//  #####   ###    ###
/**
 * A class that handles Elo ratings.
 */
class Elo {
    //                                #             #
    //                                #             #
    //  ##   #  #  ###    ##    ##   ###    ##    ###
    // # ##   ##   #  #  # ##  #      #    # ##  #  #
    // ##     ##   #  #  ##    #      #    ##    #  #
    //  ##   #  #  ###    ##    ##     ##   ##    ###
    //             #
    /**
     * Get the expected result between two ratings.
     * @param {number} a The first rating.
     * @param {number} b The second rating.
     * @return {number} The expected result.
     */
    static expected(a, b) {
        return 1 / (1 + 10 ** ((b - a) / 400));
    }

    //                #         #
    //                #         #
    // #  #  ###    ###   ###  ###    ##
    // #  #  #  #  #  #  #  #   #    # ##
    // #  #  #  #  #  #  # ##   #    ##
    //  ###  ###    ###   # #    ##   ##
    //       #
    /**
     * Updates a rating.
     * @param {number} expected The expected result.
     * @param {number} actual The actual result.
     * @param {number} rating The rating to update.
     * @param {number} k The K-Factor to use.
     * @return {number} The new rating.
     */
    static update(expected, actual, rating, k) {
        return rating + k * (actual - expected);
    }
}

module.exports = Elo;
