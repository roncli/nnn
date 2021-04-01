import {Match} from "../node/challengeTypes"
import DiscordJs from "discord.js"
import PlayerTypes from "../node/playerTypes"

declare namespace ViewTypes {
    type HomeViewParameters = {
        standings: PlayerTypes.SeasonStanding[]
        news: {
            displayName: string
            createdTimestamp: Date
            content: string
        }[]
    }

    type IndexViewParameters = {
        head: string
        html: string
        host: string
        originalUrl: string
        year: number
        version: string
    }

    type MatchViewParameters = {
        match: Match
    }

    type MatchesViewParameters = {
        upcoming: Match[]
        completed: Match[]
        totalCompleted: number
        matchesPerPage: number
        seasonList: number[]
        season: number
    }

    type PlayerViewParameters = {
        career: PlayerTypes.Career
        seasonList: number[]
        season: number
    }

    type StandingsViewParameters = {
        standings: PlayerTypes.SeasonStanding[]
        seasonList: number[]
        season: number
    }
}

export = ViewTypes
