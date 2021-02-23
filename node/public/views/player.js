/**
 * @typedef {import("../../types/browser/viewTypes").PlayerViewParameters} ViewTypes.PlayerViewParameters
 */

//  ####    ##                                #   #    #
//  #   #    #                                #   #
//  #   #    #     ###   #   #   ###   # ##   #   #   ##     ###   #   #
//  ####     #        #  #   #  #   #  ##  #   # #     #    #   #  #   #
//  #        #     ####  #  ##  #####  #       # #     #    #####  # # #
//  #        #    #   #   ## #  #      #       # #     #    #      # # #
//  #       ###    ####      #   ###   #        #     ###    ###    # #
//                       #   #
//                        ###
/**
 * A class that represents the player view.
 */
class PlayerView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.PlayerViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {career: {player, career, performance, games}, seasonList, season} = data;

        return /* html */`
            <div id="player">
                <div>
                    <div class="name font-pixel-huge">${PlayerView.Encoding.htmlEncode(player.name)}</div>
                    ${player.active ? "" : /* html */`
                        <br /><div class="inactive">Inactive</div>
                    `}
                </div>
                <div>
                    ${player.timezone ? /* html */`
                        <div class="section font-pixel-huge">Timezone</div>
                        <div class="timezone">${player.timezone}</div>
                    ` : ""}
                </div>
            </div>
            ${!career || career.length === 0 ? /* html */`
                <div>This player has recorded no matches yet.</div>
            ` : /* html */`
                <div id="career">
                    <div class="section font-pixel-huge">Career</div>
                    <div id="career-stats">
                        <div class="header font-pixel-huge">Season</div>
                        <div class="header font-pixel-huge">Rank</div>
                        <div class="header font-pixel-huge">Rating</div>
                        <div class="header font-pixel-huge">Games</div>
                        <div class="header font-pixel-huge">Record</div>
                        <div class="header font-pixel-huge">Completions</div>
                        <div class="header font-pixel-huge span-2">Avg Win Stats</div>
                        <div class="header font-pixel-huge span-2">Avg Loss Stats</div>
                        ${career.map((c) => /* html */`
                            <div>${c.season}</div>
                            <div>${c.rank}</div>
                            <div>${c.rating.toFixed(0)}</div>
                            <div>${c.games}</div>
                            <div>${c.won}-${c.lost}</div>
                            <div>${c.completed}</div>
                            <div>${c.wonDepth ? `${c.wonDepth.toFixed(0)}m` : ""}</div>
                            <div>${c.wonTime ? PlayerView.Time.formatTimespan(c.wonTime) : ""}</div>
                            <div>${c.lossDepth ? `${c.lossDepth.toFixed(0)}m` : ""}</div>
                            <div>${c.lossTime ? PlayerView.Time.formatTimespan(c.lossTime) : ""}</div>
                        `).join("")}
                    </div>
                </div>
            `}
            ${seasonList.length === 1 ? "" : /* html */`
                <div id="options">
                    <span class="grey">Season:</span> ${seasonList.map((seasonNumber, index) => /* html */`
                        ${!isNaN(season) && season !== seasonNumber || isNaN(season) && index + 1 !== seasonList.length ? /* html */`<a href="/player/${player._id}/${encodeURIComponent(player.name)}?season=${seasonNumber}">${seasonNumber}</a>` : `<span id="season">${seasonNumber}</span>`}
                    `).join(" | ")}
                </div>
            `}
            ${!performance || performance.length === 0 ? "" : /* html */`
                <div id="performance">
                    <div class="section font-pixel-huge">Performance</div>
                    <div class="subsection">for Season <span id="season">${season || seasonList[seasonList.length - 1]}</span></div>
                    <div id="performance-stats">
                        <div class="header font-pixel-huge">Vs. Opponent</div>
                        <div class="header font-pixel-huge">Games</div>
                        <div class="header font-pixel-huge">Record</div>
                        <div class="header font-pixel-huge">Completions</div>
                        <div class="header font-pixel-huge span-2">Avg Win Stats</div>
                        <div class="header font-pixel-huge span-2">Avg Loss Stats</div>
                        ${performance.map((p) => /* html */`
                            <div><a href="/player/${p.opponentPlayerId}/${encodeURIComponent(p.opponent)}">${PlayerView.Encoding.htmlEncode(p.opponent)}</a></div>
                            <div>${p.games}</div>
                            <div>${p.won}-${p.lost}</div>
                            <div>${p.completed}</div>
                            <div>${p.wonDepth ? `${p.wonDepth.toFixed(0)}m` : ""}</div>
                            <div>${p.wonTime ? PlayerView.Time.formatTimespan(p.wonTime) : ""}</div>
                            <div>${p.lossDepth ? `${p.lossDepth.toFixed(0)}m` : ""}</div>
                            <div>${p.lossTime ? PlayerView.Time.formatTimespan(p.lossTime) : ""}</div>
                        `).join("")}
                    </div>
                </div>
            `}
            ${!games || games.length === 0 ? "" : /* html */`
                <div id="games">
                    <div class="section font-pixel-huge">Game Log</div>
                    <div class="subsection">for Season <span id="season">${season || seasonList[seasonList.length - 1]}</span></div>
                    <div id="games-stats">
                        <div class="header font-pixel-huge span-2">Date</div>
                        <div class="header font-pixel-huge">Rating Change</div>
                        <div class="header font-pixel-huge">Depth</div>
                        <div class="header font-pixel-huge">Time</div>
                        <div class="header font-pixel-huge span-2">Opponent</div>
                        <div class="header font-pixel-huge">Depth</div>
                        <div class="header font-pixel-huge">Time</div>
                        ${games.map((g) => /* html */`
                            <div><time class="local" datetime="${g.matchTime}"></time></div>
                            <div>
                                ${g.won ? /* html */`
                                    <div class="won"></div>
                                ` : ""}
                                ${g.completed ? /* html */`
                                    <div class="completed"></div>
                                ` : ""}
                            </div>
                            <div>
                                ${g.ratingChange === void 0 || g.ratingChange === null ? "" : g.ratingChange.toFixed(0) === "0" || g.ratingChange < 0 ? "" : "+"}${g.ratingChange.toFixed(0)}
                            </div>
                            <div>${g.depth ? `${g.depth.toFixed(0)}m` : ""}</div>
                            <div>${g.time ? PlayerView.Time.formatTimespan(g.time) : ""}</div>
                            <div><a href="/player/${g.opponentPlayerId}/${encodeURIComponent(g.opponent)}">${PlayerView.Encoding.htmlEncode(g.opponent)}</a></div>
                            <div>
                                ${g.opponentCompleted ? /* html */`
                                    <div class="completed"></div>
                                ` : ""}
                            </div>
                            <div>${g.opponentDepth ? `${g.opponentDepth.toFixed(0)}m` : ""}</div>
                            <div>${g.opponentTime ? PlayerView.Time.formatTimespan(g.opponentTime) : ""}</div>
                        `).join("")}
                    </div>
                </div>
            `}
        `;
    }
}

/** @type {typeof import("../js/common/encoding")} */
// @ts-ignore
PlayerView.Encoding = typeof Encoding === "undefined" ? require("../js/common/encoding") : Encoding; // eslint-disable-line no-undef

/** @type {typeof import("../js/common/time")} */
// @ts-ignore
PlayerView.Time = typeof Time === "undefined" ? require("../js/common/time") : Time; // eslint-disable-line no-undef

if (typeof module !== "undefined") {
    module.exports = PlayerView; // eslint-disable-line no-undef
}
