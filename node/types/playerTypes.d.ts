import Rating from "./ratingTypes"

declare namespace PlayerTypes {
    type Career = {
        player: Player
        career: (SeasonStats & Rating.RankAndRating)[]
        performance: ({
            opponentPlayerId: number
            opponent: string
        } & Stats)[]
        games: {
            matchTime: Date
            won: boolean
            completed: boolean
            ratingChange: number
            depth: number
            time: number
            opponentPlayerId: number
            opponent: string
            opponentCompleted: boolean
            opponentDepth: number
            opponentTime: number
        }[]
    }

    type Player = {
        _id?: number
        discordId: string
        name?: string
        timezone?: string
        active: boolean
    }

    type SeasonStanding = {
        playerId: number
        name: string
        rating: number
        won: number
        lost: number
        completed: number
        wonDepth: number
        wonTime: number
        lossDepth: number
        lossTime: number        
    }

    type SeasonStats = {
        season: number
    } & Stats

    type Stats = {
        games: number
        won: number
        lost: number
        completed: number
        wonDepth: number
        lossDepth: number
        wonTime: number
        lossTime: number
    }
}

export = PlayerTypes
