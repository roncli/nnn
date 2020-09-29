/**
 * @typedef {import("../../../types/viewTypes").MatchViewParameters} ViewTypes.MatchViewParameters
 */

//  #   #          #            #      #   #    #
//  #   #          #            #      #   #
//  ## ##   ###   ####    ###   # ##   #   #   ##     ###   #   #
//  # # #      #   #     #   #  ##  #   # #     #    #   #  #   #
//  #   #   ####   #     #      #   #   # #     #    #####  # # #
//  #   #  #   #   #  #  #   #  #   #   # #     #    #      # # #
//  #   #   ####    ##    ###   #   #    #     ###    ###    # #
/**
 * A class that represents the match view.
 */
class MatchView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered page template.
     * @param {ViewTypes.MatchViewParameters} data The data to render the page with.
     * @returns {string} An HTML string of the page.
     */
    static get(data) {
        const {match} = data;

        return /* html */`
            <div class="match">
                ${match.title ? /* html */`
                    <div class="title center-align">${MatchView.Common.htmlEncode(match.title)}</div>
                ` : ""}
                <div class="player right-align">
                    ${match.players.challengingPlayer.completed ? /* html */`
                        <div class="completed" title="Completed the Game"></div>
                    ` : ""}
                    ${match.players.challengingPlayer.won ? /* html */`
                        <div class="won" title="Winner"></div>
                    ` : ""}
                    <a href="/player/${match.players.challengingPlayer.playerId}/${encodeURIComponent(match.players.challengingPlayer.name)}"><div class="name font-pixel-huge">${MatchView.Common.htmlEncode(match.players.challengingPlayer.name)}</div></a>
                </div>
                <div class="header font-pixel-huge center-align">vs.</div>
                <div class="player">
                    <a href="/player/${match.players.challengedPlayer.playerId}/${encodeURIComponent(match.players.challengedPlayer.name)}"><div class="name font-pixel-huge">${MatchView.Common.htmlEncode(match.players.challengedPlayer.name)}</div></a>
                    ${match.players.challengedPlayer.won ? /* html */`
                        <div class="won" title="Winner"></div>
                    ` : ""}
                    ${match.players.challengedPlayer.completed ? /* html */`
                        <div class="completed" title="Completed the Game"></div>
                    ` : ""}
                </div>
                <div class="match-time center-align"><time class="local" datetime="${match.matchTime}"></time></div>
                ${match.players.challengingPlayer.won || match.players.challengedPlayer.won ? /* html */ `
                    <div class="depth right-align">${match.players.challengingPlayer.depth}m</div>
                    <div class="header font-pixel-huge center-align">Depth</div>
                    <div class="depth">${match.players.challengedPlayer.depth}m</div>
                    <div class="time right-align">${MatchView.Common.formatTimespan(match.players.challengingPlayer.time)}</div>
                    <div class="header font-pixel-huge center-align">Time</div>
                    <div class="time">${MatchView.Common.formatTimespan(match.players.challengedPlayer.time)}</div>
                    ${match.players.challengingPlayer.comment || match.players.challengedPlayer.comment ? /* html */`
                        <div class="comment right-align">${match.players.challengingPlayer.comment ? /* html */`<span class="font-pixel-huge header">"</span>${MatchView.Common.htmlEncode(match.players.challengingPlayer.comment)}<span class="font-pixel-huge header">"</span>` : ""}</div>
                        <div class="header font-pixel-huge center-align">Comments</div>
                        <div class="comment">${match.players.challengedPlayer.comment ? /* html */`<span class="font-pixel-huge header">"</span>${MatchView.Common.htmlEncode(match.players.challengedPlayer.comment)}<span class="font-pixel-huge header">"</span>` : ""}</div>
                    ` : ""}
                ` : ""}
            </div>
        `;
    }
}

/** @type {typeof import("../../../web/includes/common")} */
// @ts-ignore
MatchView.Common = typeof Common === "undefined" ? require("../../../web/includes/common") : Common; // eslint-disable-line no-undef

if (typeof module !== "undefined") {
    module.exports = MatchView; // eslint-disable-line no-undef
}
