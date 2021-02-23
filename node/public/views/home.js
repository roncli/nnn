/**
 * @typedef {import("../../types/browser/viewTypes").HomeViewParameters} ViewTypes.HomeViewParameters
 */

//  #   #                       #   #    #
//  #   #                       #   #
//  #   #   ###   ## #    ###   #   #   ##     ###   #   #
//  #####  #   #  # # #  #   #   # #     #    #   #  #   #
//  #   #  #   #  # # #  #####   # #     #    #####  # # #
//  #   #  #   #  # # #  #       # #     #    #      # # #
//  #   #   ###   #   #   ###     #     ###    ###    # #
/**
 * A class that represents the home view.
 */
class HomeView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.HomeViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {standings, news} = data;

        return /* html */`
            <div id="home">
            ${standings && standings.length > 0 ? /* html */`
                <div class="section font-pixel-huge">Season Top Noidat</div>
                <div id="standings">
                    <div class="header font-pixel-huge">Pos</div>
                    <div class="header font-pixel-huge">Noita</div>
                    <div class="header font-pixel-huge">Rating</div>
                    <div class="header font-pixel-huge">Record</div>
                    <div class="header font-pixel-huge">Completions</div>
                    <div class="header font-pixel-huge avg avg-stats center-align">Avg Win Stats</div>
                    <div class="header font-pixel-huge avg avg-stats center-align">Avg Loss Stats</div>
                    ${standings.map((s, index) => /* html */`
                        <div>${index + 1}</div>
                        <div><a href="/player/${s.playerId}/${encodeURIComponent(s.name)}">${HomeView.Encoding.htmlEncode(s.name)}</a></div>
                        <div>${s.rating.toFixed(0)}</div>
                        <div>${s.won}-${s.lost}</div>
                        <div>${s.completed}</div>
                        <div class="avg">${s.wonDepth ? `${s.wonDepth.toFixed(0)}m` : ""}</div>
                        <div class="avg">${HomeView.Time.formatTimespan(s.wonTime)}</div>
                        <div class="avg">${s.lossDepth ? `${s.lossDepth.toFixed(0)}m` : ""}</div>
                        <div class="avg">${HomeView.Time.formatTimespan(s.lossTime)}</div>
                    `).join("")}
                </div>
            ` : /* html */`
                <div class="section">There are no standings available for this season.</div>
            `}
            </div>
            <div id="news">
                <div class="section font-pixel-huge">News</div>
                <div id="articles">
                    ${news.map((n) => /* html */`
                        <div class="author">Posted by ${HomeView.Encoding.htmlEncode(n.member.displayName)}, <span><time class="local" datetime="${n.createdTimestamp}"></time></span></div>
                        <div class="body">${n.content}</div>
                    `).join("")}
                </div>
            </div>
        `;
    }
}

/** @type {typeof import("../js/common/encoding")} */
// @ts-ignore
HomeView.Encoding = typeof Encoding === "undefined" ? require("../js/common/encoding") : Encoding; // eslint-disable-line no-undef

/** @type {typeof import("../js/common/time")} */
// @ts-ignore
HomeView.Time = typeof Time === "undefined" ? require("../js/common/time") : Time; // eslint-disable-line no-undef

if (typeof module !== "undefined") {
    module.exports = HomeView; // eslint-disable-line no-undef
}
