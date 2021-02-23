/**
 * @typedef {import("../../types/browser/viewTypes").IndexViewParameters} ViewTypes.IndexViewParameters
 */

//   ###              #                #   #    #
//    #               #                #   #
//    #    # ##    ## #   ###   #   #  #   #   ##     ###   #   #
//    #    ##  #  #  ##  #   #   # #    # #     #    #   #  #   #
//    #    #   #  #   #  #####    #     # #     #    #####  # # #
//    #    #   #  #  ##  #       # #    # #     #    #      # # #
//   ###   #   #   ## #   ###   #   #    #     ###    ###    # #
/**
 * A class that represents the general website template.
 */
class IndexView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.IndexViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {head, html, protocol, host, originalUrl, year, version} = data;

        return /* html */`
            <html>
                <head>
                    <title>Noita Nemesis Nation</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <meta name="og:image" content="${protocol}://${host}/images/nnn.png" />
                    <meta name="og:title" content="Noita Nemesis Nation" />
                    <meta name="og:type" content="website" />
                    <meta name="og:url" content="${protocol}://${host}${encodeURI(originalUrl)}" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:creator" content="@roncli" />
                    ${head}
                </head>
                <body>
                    <svg>
                        <filter id="noita-blue">
                            <feColorMatrix type="matrix" values="
                                0 0 0 0 0.0199
                                0 0 0 0 0.1569
                                0 0 0 0 0.3553
                                0 0 0 1 0
                            " />
                        </filter>
                        <filter id="noita-purple">
                            <feColorMatrix type="matrix" values="
                                0 0 0 0 0.1569
                                0 0 0 0 0.0820
                                0 0 0 0 0.1929
                                0 0 0 1 0
                            " />
                        </filter>
                    </svg>
                    <div id="page">
                        <div id="menu">
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/standings">Standings</a></li>
                                <li><a href="/matches">Matches</a></li>
                                <li><a href="https://challonge.com/communities/nnn" target="_blank">Tournaments</a></li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/links">Links</a></li>
                            </ul>
                        </div>
                        <div id="header">
                            <div id="logo"></div>
                            <div id="title"></div>
                        </div>
                        <div id="page-body">
                            ${html}
                            <div id="discord">
                                <div class="section title font-pixel-huge">Join the Nation on Discord!</div>
                                <div class="text">Interested in joining?  The Noita Nemesis Nation coordinates all of our matches via the Nation's Discord server.  Join today and compete with Noidat from all over the world.</div>
                                <div class="link"><a href="/discord" target="_blank"><img src="/images/discord.png" /></a></div>
                            </div>
                        </div>
                        <div id="copyright">
                            <div class="left">
                                Version ${version}, &copy;${+year > 2020 ? "2020-" : ""}${year} roncli Productions
                            </div>
                            <div class="right">
                                Bugs?  <a href="https://github.com/roncli/nnn/issues" target="_blank">Report on GitHub</a>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `;
    }
}

if (typeof module !== "undefined") {
    module.exports = IndexView; // eslint-disable-line no-undef
}
