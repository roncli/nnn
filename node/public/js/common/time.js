//  #####    #
//    #
//    #     ##    ## #    ###
//    #      #    # # #  #   #
//    #      #    # # #  #####
//    #      #    # # #  #
//    #     ###   #   #   ###
/**
 * A class that provides functions to deal with time.
 */
class Time {
    //   #                            #    ###    #
    //  # #                           #     #
    //  #     ##   ###   # #    ###  ###    #    ##    # #    ##
    // ###   #  #  #  #  ####  #  #   #     #     #    ####  # ##
    //  #    #  #  #     #  #  # ##   #     #     #    #  #  ##
    //  #     ##   #     #  #   # #    ##   #    ###   #  #   ##
    /**
     * Formats the time portion of the date.
     * @param {Date} time The time to display.
     * @returns {string} The formatted time.
     */
    static formatTime(time) {
        return `${time.getHours() === 0 ? 12 : time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}:${time.getMinutes() < 10 ? "0" : ""}${time.getMinutes()} ${time.getHours() < 12 ? "AM" : "PM"}`;
    }

    //   #                            #    ###          #
    //  # #                           #    #  #         #
    //  #     ##   ###   # #    ###  ###   #  #   ###  ###    ##
    // ###   #  #  #  #  ####  #  #   #    #  #  #  #   #    # ##
    //  #    #  #  #     #  #  # ##   #    #  #  # ##   #    ##
    //  #     ##   #     #  #   # #    ##  ###    # #    ##   ##
    /**
     * Formats the date to show in the user's time zone.
     * @param {Date} time The date and time to display.
     * @returns {string} The formatted date and time.
     */
    static formatDate(time) {
        const now = new Date(),
            today = new Date(now);

        today.setMilliseconds(0);
        today.setSeconds(0);
        today.setMinutes(0);
        today.setHours(0);

        const date = new Date(time);

        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);

        switch (date.getTime() - today.getTime()) {
            case 0:
                return `Today ${this.formatTime(time)}`;
            case 86400000:
                return `Tomorrow ${this.formatTime(time)}`;
            case -86400000:
                return `Yesterday ${this.formatTime(time)}`;
            default:
                return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][time.getMonth()]} ${time.getDate()} ${time.getFullYear()} ${this.formatTime(time)}`;
        }
    }

    //   #                            #    ###    #
    //  # #                           #     #
    //  #     ##   ###   # #    ###  ###    #    ##    # #    ##    ###   ###    ###  ###
    // ###   #  #  #  #  ####  #  #   #     #     #    ####  # ##  ##     #  #  #  #  #  #
    //  #    #  #  #     #  #  # ##   #     #     #    #  #  ##      ##   #  #  # ##  #  #
    //  #     ##   #     #  #   # #    ##   #    ###   #  #   ##   ###    ###    # #  #  #
    //                                                                    #
    /**
     * Formats a timespan.
     * @param {number} time The number of seconds.
     * @returns {string} A string representing the timespan.
     */
    static formatTimespan(time) {
        if (!time) {
            return "";
        }

        time = Math.round(time);
        return `${Math.floor(time / 3600)}:${(Math.floor(time / 60) % 60).toLocaleString("en-US", {minimumIntegerDigits: 2})}:${(time % 60).toLocaleString("en-US", {minimumIntegerDigits: 2})}`;
    }

    //                                ###    #
    //                                 #
    // ###    ###  ###    ###    ##    #    ##    # #    ##
    // #  #  #  #  #  #  ##     # ##   #     #    ####  # ##
    // #  #  # ##  #       ##   ##     #     #    #  #  ##
    // ###    # #  #     ###     ##    #    ###   #  #   ##
    // #
    /**
     * Parses time elements to display the local time.
     * @returns {void}
     */
    static parseTime() {
        /** @type {NodeListOf<HTMLTimeElement>} */
        const elements = document.querySelectorAll("time.local");

        elements.forEach((el) => {
            el.innerText = this.formatDate(new Date(el.dateTime));
            el.classList.remove("local");
        });
    }

    // ###    ##   #  #   ##                #                 #    #                    #           #
    // #  #  #  #  ####  #  #               #                 #    #                    #           #
    // #  #  #  #  ####  #      ##   ###   ###    ##   ###   ###   #      ##    ###   ###   ##    ###
    // #  #  #  #  #  #  #     #  #  #  #   #    # ##  #  #   #    #     #  #  #  #  #  #  # ##  #  #
    // #  #  #  #  #  #  #  #  #  #  #  #   #    ##    #  #   #    #     #  #  # ##  #  #  ##    #  #
    // ###    ##   #  #   ##    ##   #  #    ##   ##   #  #    ##  ####   ##    # #   ###   ##    ###
    /**
     * Parses time on page load.
     * @returns {void}
     */
    static DOMContentLoaded() {
        Time.parseTime();
    }
}

if (typeof module === "undefined") {
    document.addEventListener("DOMContentLoaded", Time.DOMContentLoaded);
    window.Time = Time;
} else {
    module.exports = Time; // eslint-disable-line no-undef
}
