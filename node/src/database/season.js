/**
 * @typedef {import("../../types/seasonTypes").Season} SeasonTypes.Season
 */

const MongoDb = require("mongodb"),

    Cache = require("../redis/cache"),
    Db = require(".");

//   ###                                      ####   #
//  #   #                                      #  #  #
//  #       ###    ###    ###    ###   # ##    #  #  # ##
//   ###   #   #      #  #      #   #  ##  #   #  #  ##  #
//      #  #####   ####   ###   #   #  #   #   #  #  #   #
//  #   #  #      #   #      #  #   #  #   #   #  #  ##  #
//   ###    ###    ####  ####    ###   #   #  ####   # ##
/**
 * A class to handle database calls for the season collection.
 */
class SeasonDb {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets a season by the season number.
     * @param {number} id The season number.
     * @returns {Promise<SeasonTypes.Season>} A promise that resolves with the season.
     */
    static async get(id) {
        const db = await Db.get();

        /** @type {SeasonTypes.Season} */
        const data = await db.collection("season").findOne({_id: MongoDb.Long.fromNumber(id)});

        return data || void 0;
    }

    //              #    ####                    ###          #
    //              #    #                       #  #         #
    //  ###   ##   ###   ###   ###    ##   # #   #  #   ###  ###    ##
    // #  #  # ##   #    #     #  #  #  #  ####  #  #  #  #   #    # ##
    //  ##   ##     #    #     #     #  #  #  #  #  #  # ##   #    ##
    // #      ##     ##  #     #      ##   #  #  ###    # #    ##   ##
    //  ###
    /**
     * Gets a season from the date, creating it if it's in the future.
     * @param {Date} date The date.
     * @returns {Promise<SeasonTypes.Season>} A promise that resolves with the season.
     */
    static async getFromDate(date) {
        const db = await Db.get();

        /** @type {SeasonTypes.Season} */
        let data = await db.collection("season").findOne({startDate: {$lte: date}});

        if (!data) {
            return void 0;
        }

        data = void 0;

        /** @type {number} */
        let k;

        while (!data) {
            data = await db.collection("season").findOne({
                $and: [
                    {startDate: {$lte: date}},
                    {endDate: {$gt: date}}
                ]
            });

            if (!data) {
                if (!k) {
                    k = (await db.collection("season").aggregate([
                        {
                            $sort: {season: -1}
                        },
                        {
                            $project: {
                                _id: 0,
                                K: 1
                            }
                        },
                        {
                            $limit: 1
                        }
                    ]).toArray())[0].K.valueOf();
                }

                /** @type {{endDate: Date}[]} */
                const maxSeason = await db.collection("season").aggregate([
                    {
                        $group: {
                            _id: null,
                            endDate: {$max: "$endDate"}
                        }
                    }
                ]).toArray();

                const season = {
                    startDate: maxSeason[0].endDate,
                    endDate: new Date(maxSeason[0].endDate.getFullYear(), maxSeason[0].endDate.getMonth() + 2, maxSeason[0].endDate.getDate()),
                    K: new MongoDb.Int32(k)
                };

                await Db.id(season, "season");

                await db.collection("season").insertOne(season);
            }
        }

        return data || void 0;
    }

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
        const key = `${process.env.REDIS_PREFIX}:seasonNumbers`;

        /** @type {number[]} */
        let cache = await Cache.get(key);

        if (cache) {
            return cache;
        }

        const db = await Db.get();

        /** @type {{season: number}[]} */
        const data = await db.collection("season").find().project({_id: 0, season: "$_id"}).sort({_id: 1}).toArray();

        cache = data && data.map((s) => s.season) || [1];

        const seasonObj = await SeasonDb.get(cache[cache.length - 1]);

        Cache.add(key, cache, seasonObj && seasonObj.endDate || void 0);

        return cache;
    }
}

module.exports = SeasonDb;
