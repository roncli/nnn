import { Player } from "./playerTypes"

declare namespace ChallengeTypes {
    type Challenge = {
        _id?: number
        players: {
            challengingPlayerId: number
            challengedPlayerId: number
        }
        title?: string
        suggestedTime?: Date
        suggestedByPlayerId?: number
        matchTime?: Date
        reportTime?: Date
        confirmedTime?: Date
        closeTime?: Date
        voidTime?: Date
        rematchedTime?: Date
        rematchRequestedByPlayerId?: number
        season?: number
        postseason?: boolean
        stats?: {
            challengingPlayer?: Stats
            challengedPlayer?: Stats
        },
        ratings?: {
            challengingPlayerRating?: number,
            challengedPlayerRating?: number,
            change?: number
        }
    }

    type ChallengeWithPlayers = Challenge & {
        players: {
            challengingPlayer?: Player
            challengedPlayer?: Player
        }
        suggestedByPlayer?: Player
        rematchRequestedByPlayer?: Player
    }

    type Match = {
        title?: string
        matchTime: Date
        players: {
            challengingPlayer: {
                playerId: number
                name: string
                won?: boolean
                depth?: number
                time?: number
                completed?: boolean
                comment?: string
            }
            challengedPlayer: {
                playerId: number
                name: string
                won?: boolean
                depth?: number
                time?: number
                completed?: boolean
                comment?: string
            }
        }
    }

    type Result = {
        _id: number
        challengingPlayerId: number
        challengedPlayerId: number
        challengingPlayerWon: boolean
        challengedPlayerWon: boolean
    }

    type Stats = {
        won?: boolean
        depth?: number
        time?: number
        completed?: boolean
        comment?: string
    }

    type UpcomingChallenge = {
        matchTime: Date
        challengingPlayerName: string
        challengedPlayerName: string
    }
}

export = ChallengeTypes
