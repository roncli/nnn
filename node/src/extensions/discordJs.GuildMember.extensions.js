const DiscordJs = require("discord.js"),

    Challenge = require("../models/challenge"),
    Db = require("../database/player"),
    Exception = require("../errors/exception");

/** @type {typeof import("../discord")} */
let Discord;

setTimeout(() => {
    Discord = require("../discord");
}, 0);

//       ##                      ###    #
//        #                       #
//  ##    #     ##    ###  ###    #    ##    # #    ##   ####   ##   ###    ##
// #      #    # ##  #  #  #  #   #     #    ####  # ##    #   #  #  #  #  # ##
// #      #    ##    # ##  #      #     #    #  #  ##     #    #  #  #  #  ##
//  ##   ###    ##    # #  #      #    ###   #  #   ##   ####   ##   #  #   ##
DiscordJs.GuildMember.prototype.clearTimezone = async function() {
    try {
        return await Db.clearTimezone(this);
    } catch (err) {
        throw new Exception("There was a database error clearing a player's timezone.", err);
    }
};

//               #     ##          #     #
//               #    #  #         #
//  ###    ##   ###   #  #   ##   ###   ##    # #    ##
// ##     # ##   #    ####  #      #     #    # #   # ##
//   ##   ##     #    #  #  #      #     #    # #   ##
// ###     ##     ##  #  #   ##     ##  ###    #     ##
DiscordJs.GuildMember.prototype.setActive = async function(active) {
    try {
        await Db.setActive(this, active);
    } catch (err) {
        throw new Exception("There was a database error setting a player's active state.", err);
    }

    let challenges;
    try {
        challenges = await Challenge.getPendingForMember(this);
    } catch (err) {
        throw new Exception("There was a database error getting the player's pending challenges.", err);
    }

    if (challenges.length > 0) {
        await Discord.queue(`${this} has gone inactive.  Please void or close their existing challenges.`, /** @type {DiscordJs.TextChannel} */(Discord.findChannelByName("nnnbot-alerts"))); // eslint-disable-line no-extra-parens

        for (const challenge of challenges) {
            await Discord.queue(`${this} is no longer active in the Nation.  This match may still be played.  However, if the match is not going to be played, please contact an admin to have the challenge removed.`, challenge.channel);
        }
    }
};

//               #    ###    #
//               #     #
//  ###    ##   ###    #    ##    # #    ##   ####   ##   ###    ##
// ##     # ##   #     #     #    ####  # ##    #   #  #  #  #  # ##
//   ##   ##     #     #     #    #  #  ##     #    #  #  #  #  ##
// ###     ##     ##   #    ###   #  #   ##   ####   ##   #  #   ##
DiscordJs.GuildMember.prototype.setTimezone = async function(timezone) {
    try {
        await Db.setTimezone(this, timezone);
    } catch (err) {
        throw new Exception("There was a database error setting a player's time zone.", err);
    }
};

//                #         #          #  #
//                #         #          ## #
// #  #  ###    ###   ###  ###    ##   ## #   ###  # #    ##
// #  #  #  #  #  #  #  #   #    # ##  # ##  #  #  ####  # ##
// #  #  #  #  #  #  # ##   #    ##    # ##  # ##  #  #  ##
//  ###  ###    ###   # #    ##   ##   #  #   # #  #  #   ##
//       #
DiscordJs.GuildMember.prototype.updateName = async function(oldMember) {
    try {
        await Db.setName(this);
    } catch (err) {
        throw new Exception("There was a database error updating the player's name.", err);
    }

    let challenges;
    try {
        challenges = await Challenge.getPendingForMember(this);
    } catch (err) {
        throw new Exception("There was a database error getting the player's pending challenges.", err);
    }

    for (const challenge of challenges) {
        await Discord.channels.find((c) => c.name.endsWith(`-${challenge._id}`)).setName(challenge.channelName, `${oldMember.displayName} changed their name to ${this.displayName}.`);
        await challenge.updatePinnedPost();
    }
};
