//  #   #          #            #
//  #   #          #            #
//  ## ##   ###   ####    ###   # ##    ###    ###
//  # # #      #   #     #   #  ##  #  #   #  #
//  #   #   ####   #     #      #   #  #####   ###
//  #   #  #   #   #  #  #   #  #   #  #          #
//  #   #   ####    ##    ###   #   #   ###   ####
/**
 * A class that handles the matches page.
 */
class Matches {
    //   #    #          #                        #    #
    //  # #              #                        #    #
    //  #    ##    #  #  #      ##   ###    ###  ###   ###    ###
    // ###    #     ##   #     # ##  #  #  #  #   #    #  #  ##
    //  #     #     ##   #     ##    #  #   ##    #    #  #    ##
    //  #    ###   #  #  ####   ##   #  #  #       ##  #  #  ###
    //                                      ###
    /**
     * Fixes the lengths of the names when they are too big.
     * @returns {void}
     */
    static fixLengths() {
        /** @type {NodeListOf<HTMLElement>} */
        const elements = document.querySelectorAll(".name");

        elements.forEach((el) => {
            let zoom = 1;
            while (el.offsetHeight > 20 && zoom > 0.1) {
                zoom -= 0.1;
                el.style.transform = `scale(${zoom})`;
                el.style.transformOrigin = "0 0";
                el.style.width = `${100 / zoom}%`;
                el.style.imageRendering = "auto";
            }
        });
    }

    // ###    ##   #  #   ##                #                 #    #                    #           #
    // #  #  #  #  ####  #  #               #                 #    #                    #           #
    // #  #  #  #  ####  #      ##   ###   ###    ##   ###   ###   #      ##    ###   ###   ##    ###
    // #  #  #  #  #  #  #     #  #  #  #   #    # ##  #  #   #    #     #  #  #  #  #  #  # ##  #  #
    // #  #  #  #  #  #  #  #  #  #  #  #   #    ##    #  #   #    #     #  #  # ##  #  #  ##    #  #
    // ###    ##   #  #   ##    ##   #  #    ##   ##   #  #    ##  ####   ##    # #   ###   ##    ###
    /**
     * Initializes the page.
     * @returns {void}
     */
    static DOMContentLoaded() {
        Array.from(document.getElementsByClassName("select-page")).forEach((/** @type {HTMLElement} */ paginator) => {
            paginator.addEventListener("click", async (ev) => {
                if (/** @type {HTMLElement} */(ev.target).classList.contains("active")) { // eslint-disable-line no-extra-parens
                    return;
                }

                Array.from(document.getElementsByClassName("select-page")).forEach((page) => {
                    page.classList.remove("active");
                });

                paginator.classList.add("active");

                Matches.page = +paginator.dataset.page;

                let data;
                try {
                    data = await (await fetch(`/api/match?season=${document.getElementById("season").innerText}&page=${Matches.page}`)).json();
                } catch (err) {
                    return;
                }

                Matches.Template.loadDataIntoTemplate(data, document.querySelector("#completed-matches"), Matches.MatchView.get);

                Matches.Time.parseTime();

                Matches.Font.parseFont();

                Matches.fixLengths();
            });

            paginator.addEventListener("selectstart", (ev) => {
                ev.preventDefault();
            });
        });

        if (document.getElementById("select-prev")) {
            document.getElementById("select-prev").addEventListener("click", () => {
                /** @type {HTMLElement} */
                const el = document.querySelector(`.select-page-${Matches.page - 1}`);

                if (el) {
                    el.click();
                }
            });

            document.getElementById("select-prev").addEventListener("selectstart", (ev) => {
                ev.preventDefault();
            });
        }

        if (document.getElementById("select-next")) {
            document.getElementById("select-next").addEventListener("click", () => {
                /** @type {HTMLElement} */
                const el = document.querySelector(`.select-page-${Matches.page + 1}`);

                if (el) {
                    el.click();
                }
            });

            document.getElementById("select-next").addEventListener("selectstart", (ev) => {
                ev.preventDefault();
            });
        }

        Matches.fixLengths();
    }
}

/** @type {typeof import("./common/font")} */
// @ts-ignore
Matches.Font = typeof Font === "undefined" ? require("./common/font") : Font; // eslint-disable-line no-undef

/** @type {typeof import("../views/matches/match")} */
// @ts-ignore
Matches.MatchView = typeof MatchView === "undefined" ? require("../views/matches/match") : MatchView; // eslint-disable-line no-undef

Matches.page = 1;

/** @type {typeof import("./common/template")} */
// @ts-ignore
Matches.Template = typeof Template === "undefined" ? require("./common/template") : Template; // eslint-disable-line no-undef

/** @type {typeof import("./common/time")} */
// @ts-ignore
Matches.Time = typeof Time === "undefined" ? require("./common/time") : Time; // eslint-disable-line no-undef

if (typeof module === "undefined") {
    document.addEventListener("DOMContentLoaded", Matches.DOMContentLoaded);
    window.Matches = Matches;
} else {
    module.exports = Matches; // eslint-disable-line no-undef
}
