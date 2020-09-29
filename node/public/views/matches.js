/**
 * @typedef {import("../../types/viewTypes").MatchesViewParameters} ViewTypes.MatchesViewParameters
 */

//  #   #          #            #                    #   #    #
//  #   #          #            #                    #   #
//  ## ##   ###   ####    ###   # ##    ###    ###   #   #   ##     ###   #   #
//  # # #      #   #     #   #  ##  #  #   #  #       # #     #    #   #  #   #
//  #   #   ####   #     #      #   #  #####   ###    # #     #    #####  # # #
//  #   #  #   #   #  #  #   #  #   #  #          #   # #     #    #      # # #
//  #   #   ####    ##    ###   #   #   ###   ####     #     ###    ###    # #
/**
 * A class that represents the matches view.
 */
class MatchesView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.MatchesViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {upcoming, completed, totalCompleted, matchesPerPage, seasonList, season} = data;

        return /* html */`
            <div id="upcoming">
                ${upcoming.length === 0 ? /* html */`
                    <div class="section font-pixel-huge">No upcoming matches.</div>
                ` : /* html */`
                    <div class="section font-pixel-huge">Upcoming Matches</div>
                    <div id="upcoming-matches">
                        ${upcoming.map((m) => MatchesView.MatchView.get({match: m})).join("")}
                    </div>
                `}
            </div>
            ${seasonList.length === 1 ? "" : /* html */`
                <div id="options">
                    <span class="grey">Season:</span> ${seasonList.map((seasonNumber, index) => /* html */`
                        ${!isNaN(season) && season !== seasonNumber || isNaN(season) && index + 1 !== seasonList.length ? /* html */`<a href="/matches?season=${seasonNumber}">${seasonNumber}</a>` : `<span id="season">${seasonNumber}</span>`}
                    `).join(" | ")}
                </div>
            `}
            <div id="completed">
                ${completed.length === 0 ? /* html */`
                    <div class="section font-pixel-huge">No matches played.</div>
                ` : /* html */`
                    <div class="section font-pixel-huge">Completed Matches</div>
                    <div class="subsection">for Season <span id="season">${season || seasonList[seasonList.length - 1]}</span></div>
                        ${totalCompleted > matchesPerPage ? /* html */`
                            <div class="paginator">
                                <div class="paginator-text">
                                    <div>Page:</div>
                                </div>
                                <div id="select-prev" class="paginator-page">
                                    <div class="font-pixel-huge">&lt;&lt;</div>
                                </div>
                                ${Array.from(new Array(Math.ceil(totalCompleted / matchesPerPage))).map((_, index) => /* html */`
                                    <div class="paginator-page select-page select-page-${index + 1} ${index === 0 ? "active" : ""}" data-page="${index + 1}">
                                        <div class="font-pixel-huge">${index + 1}</div>
                                    </div>
                                `).join("")}
                                <div id="select-next" class="paginator-page">
                                    <div class="font-pixel-huge">&gt;&gt;</div>
                                </div>
                            </div>
                        ` : ""}
                    <div id="completed-matches">
                        ${completed.map((m) => MatchesView.MatchView.get({match: m})).join("")}
                    </div>
                `}
            </div>
        `;
    }
}

/** @type {typeof import("../../web/includes/common")} */
// @ts-ignore
MatchesView.Common = typeof Common === "undefined" ? require("../../web/includes/common") : Common; // eslint-disable-line no-undef

/** @type {typeof import("./matches/match.js")} */
// @ts-ignore
MatchesView.MatchView = typeof MatchView === "undefined" ? require("./matches/match.js") : MatchView; // eslint-disable-line no-undef

if (typeof module !== "undefined") {
    module.exports = MatchesView; // eslint-disable-line no-undef
}
