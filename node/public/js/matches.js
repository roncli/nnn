/* global Common, MatchView, SpriteFont */

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
        for (const e of document.getElementsByClassName("name")) {
            let zoom = 1;
            while (e.offsetHeight > 20) {
                zoom -= 0.1;
                e.style.zoom = zoom;
                e.style["image-rendering"] = "auto";
            }
        }
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
        Matches.page = 1;

        Array.from(document.getElementsByClassName("select-page")).forEach((paginator) => {
            paginator.addEventListener("click", (ev) => {
                if (ev.target.classList.contains("active")) {
                    return;
                }

                Array.from(document.getElementsByClassName("select-page")).forEach((page) => {
                    page.classList.remove("active");
                });

                paginator.classList.add("active");

                Matches.page = +paginator.dataset.page;

                Common.loadDataIntoTemplate(`/api/match?season=${document.getElementById("season").innerText}&page=${Matches.page}`, "#completed-matches", MatchView.get).then(() => {
                    Common.parseTime();
                    for (const el of document.querySelectorAll("#completed-matches .font-pixel-huge")) {
                        new SpriteFont(el, "Font Pixel Huge");
                    }
                    Matches.fixLengths();
                });
            });

            paginator.addEventListener("selectstart", (ev) => {
                ev.preventDefault();
            });
        });

        if (document.getElementById("select-prev")) {
            document.getElementById("select-prev").addEventListener("click", () => {
                const el = document.getElementsByClassName(`select-page-${Matches.page - 1}`)[0];

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
                const el = document.getElementsByClassName(`select-page-${Matches.page + 1}`)[0];

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

document.addEventListener("DOMContentLoaded", Matches.DOMContentLoaded);
