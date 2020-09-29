import {Match} from "./challengeTypes"
import DiscordJs from "discord.js"
import PlayerTypes from "./playerTypes"

declare namespace ViewTypes {
    type HomeViewParameters = {
        standings: PlayerTypes.SeasonStanding[]
        news: DiscordJs.Message[]
    }

    type IndexViewParameters = {
        head: string
        html: string
        protocol: string
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
