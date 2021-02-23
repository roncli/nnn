import {GuildMember} from "discord.js"

declare module "discord.js" {
    interface GuildMember {
        /**
         * Clears a player's timezone.
         * @returns {Promise<void>} A promise that resolves when the timezone is clear.
         */
        clearTimezone(): Promise<void>

        /**
         * Sets a player's active state.
         * @param {boolean} active The state to set the player's active state to.
         * @returns {Promise<void>} A promise that resolves when the player's active state is set.
         */
        setActive(active: boolean): Promise<void>

        /**
         * Sets a player's time zone.
         * @param {string} timezone The time zone to set.
         * @returns {Promise} A promise that resolves when the time zone has been set.
         */
        setTimezone(timezone: string): Promise<void>

        /**
         * Updates the player's name.
         * @param {DiscordJs.GuildMember} oldMember The member with their old name.
         * @returns {Promise} A promise that resolves when the player's name is updated.
         */
        updateName(oldMember: GuildMember): Promise<void>
    }
}
