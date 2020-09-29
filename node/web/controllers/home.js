/**
 * @typedef {import("discord.js").TextChannel} DiscordJs.TextChannel
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

const DiscordMarkdown = require("discord-markdown"),

    Common = require("../includes/common"),
    Discord = require("../../src/discord"),
    HomeView = require("../../public/views/home"),
    Player = require("../../src/models/player");

//   #   #
//   #   #
//   #   #   ###   ## #    ###
//   #####  #   #  # # #  #   #
//   #   #  #   #  # # #  #####
//   #   #  #   #  # # #  #
//   #   #   ###   #   #   ###
/**
 * A class that represents the home page.
 */
class Home {
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
        const standings = await Player.getSeasonStandings();

        let news;
        try {
            const discordNews = await /** @type {DiscordJs.TextChannel} */(Discord.findChannelByName("announcements")).messages.fetch({limit: 5}); // eslint-disable-line no-extra-parens

            news = discordNews.map((m) => {
                m.content = DiscordMarkdown.toHTML(m.content, {discordCallback: {user: (user) => `@${Discord.findGuildMemberById(user.id).displayName}`, channel: (channel) => `#${Discord.findChannelById(channel.id).name}`, role: (role) => `@${Discord.findRoleById(role.id).name}`, emoji: () => ""}});

                return m;
            });
        } catch (err) {
            news = [];
        }

        res.status(200).send(Common.page(
            "",
            {css: ["/css/home.css"]},
            HomeView.get({
                standings,
                news
            }),
            req
        ));
    }
}

Home.route = {
    path: "/"
};

module.exports = Home;
