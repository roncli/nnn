//  #   #          #     #                 #  #   #          #       #     ##     ##                             #  #   #    #
//  #   #          #     #                 #  #   #          #      # #     #      #                             #  #   #
//  ## ##   ###   ####   # ##    ###    ## #  ##  #   ###   ####   #   #    #      #     ###   #   #   ###    ## #  #   #   ##     ###   #   #
//  # # #  #   #   #     ##  #  #   #  #  ##  # # #  #   #   #     #   #    #      #    #   #  #   #  #   #  #  ##   # #     #    #   #  #   #
//  #   #  #####   #     #   #  #   #  #   #  #  ##  #   #   #     #####    #      #    #   #  # # #  #####  #   #   # #     #    #####  # # #
//  #   #  #       #  #  #   #  #   #  #  ##  #   #  #   #   #  #  #   #    #      #    #   #  # # #  #      #  ##   # #     #    #      # # #
//  #   #   ###     ##   #   #   ###    ## #  #   #   ###     ##   #   #   ###    ###    ###    # #    ###    ## #    #     ###    ###    # #
/**
 * A class that represents the 405 view.
 */
class MethodNotAllowedView {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Gets the rendered method not allowed template.
     * @param {{message: string}} data The data for the method not allowed view.
     * @returns {string} An HTML string of the method not allowed view.
     */
    static get(data) {
        const {message} = data;

        return /* html */`
            <div id="error">
                <div class="section font-pixel-huge">405 - Chaotically Polymorphed</div>
                <div>${message}</div>
            </div>
        `;
    }
}

if (typeof module !== "undefined") {
    module.exports = MethodNotAllowedView; // eslint-disable-line no-undef
}
