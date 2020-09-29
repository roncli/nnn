declare namespace RatingTypes {
    type RankAndRating = {
        rank: number
        rating: number
    }

    type Rating = {
        _id?: string
        playerId: number
        season: number
        rating: number
    }

    type RatingChange = {
        challengingPlayerRating: number
        challengedPlayerRating: number
        change: number
    }

    type Standing = {
        discordId: string,
        rating: number,
        won: number,
        lost: number
    }
}

export = RatingTypes
