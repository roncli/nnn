/**
 * @typedef {import("../../types/viewTypes").StandingsViewParameters} ViewTypes.StandingsViewParameters
 */

//   ###    #                       #    #                         #   #
//  #   #   #                       #                              #   #
//  #      ####    ###   # ##    ## #   ##    # ##    ## #   ###   #   #   ###   ## #    ###
//   ###    #         #  ##  #  #  ##    #    ##  #  #  #   #      #####  #   #  # # #  #   #
//      #   #      ####  #   #  #   #    #    #   #   ##     ###   #   #  #   #  # # #  #####
//  #   #   #  #  #   #  #   #  #  ##    #    #   #  #          #  #   #  #   #  # # #  #
//   ###     ##    ####  #   #   ## #   ###   #   #   ###   ####   #   #   ###   #   #   ###
//                                                   #   #
//                                                    ###
/**
 * A class that represents the standings view.
 */
class StandingsView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.StandingsViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {standings, seasonList, season} = data;

        return /* html */`
            <div id="standings">
                ${seasonList.length === 1 ? "" : /* html */`
                    <div id="options">
                        <span class="grey">Season:</span> ${seasonList.map((seasonNumber, index) => /* html */`
                            ${!isNaN(season) && season !== seasonNumber || isNaN(season) && index + 1 !== seasonList.length ? /* html */`<a href="/standings?season=${seasonNumber}">${seasonNumber}</a>` : `<span id="season">${seasonNumber}</span>`}
                        `).join(" | ")}
                    </div>
                `}
                ${standings && standings.length > 0 ? /* html */`
                    <div class="section font-pixel-huge">Standings</div>
                    <div class="subsection">for Season <span id="season">${season || seasonList[seasonList.length - 1]}</span></div>
                    <div id="standings-list">
                        <div class="header font-pixel-huge">Pos</div>
                        <div class="header font-pixel-huge">Noita</div>
                        <div class="header font-pixel-huge">Rating</div>
                        <div class="header font-pixel-huge">Record</div>
                        <div class="header font-pixel-huge">Completions</div>
                        <div class="header font-pixel-huge avg avg-stats center-align">Avg Win Stats</div>
                        <div class="header font-pixel-huge avg avg-stats center-align">Avg Loss Stats</div>
                        ${standings.map((s, index) => /* html */`
                            <div>${index + 1}</div>
                            <div><a href="/player/${s.playerId}/${encodeURIComponent(s.name)}">${StandingsView.Common.htmlEncode(s.name)}</a></div>
                            <div>${s.rating.toFixed(0)}</div>
                            <div>${s.won}-${s.lost}</div>
                            <div>${s.completed}</div>
                            <div class="avg">${s.wonDepth ? `${s.wonDepth.toFixed(0)}m` : ""}</div>
                            <div class="avg">${StandingsView.Common.formatTimespan(s.wonTime)}</div>
                            <div class="avg">${s.lossDepth ? `${s.lossDepth.toFixed(0)}m` : ""}</div>
                            <div class="avg">${StandingsView.Common.formatTimespan(s.lossTime)}</div>
                        `).join("")}
                    </div>
                ` : /* html */`
                    <div class="section">There are no standings available for this season.</div>
                `}
            </div>
        `;
    }
}

/** @type {typeof import("../../web/includes/common")} */
// @ts-ignore
StandingsView.Common = typeof Common === "undefined" ? require("../../web/includes/common") : Common; // eslint-disable-line no-undef

if (typeof module !== "undefined") {
    module.exports = StandingsView; // eslint-disable-line no-undef
}
