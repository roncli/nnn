const admin = db.getSiblingDB("admin");
const nnn = db.getSiblingDB("nnn");

admin.setProfilingLevel(0);
nnn.setProfilingLevel(0);

// Create web user for access.
admin.createUser({
    user: "web_nnn",
    pwd: WEB_NNN_PASSWORD,
    roles: [{
        role: "readWrite",
        db: "nnn"
    }],
    mechanisms: ["SCRAM-SHA-256"]
});

nnn.createCollection("counters", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "value"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "string"
                },
                value: {
                    bsonType: "long"
                }
            }
        }
    }
});

nnn.counters.insert([
    {_id: "player", value: NumberLong(0)},
    {_id: "challenge", value: NumberLong(0)},
    {_id: "season", value: NumberLong(1)}
]);

nnn.createCollection("player", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "discordId", "active"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "long"
                },
                discordId: {
                    bsonType: "string"
                },
                name: {
                    bsonType: "string"
                },
                timezone: {
                    bsonType: "string"
                },
                active: {
                    bsonType: "bool"
                }
            }
        }
    }
});

nnn.player.createIndex({discordId: 1}, {unique: true});

nnn.createCollection("season", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "startDate", "endDate", "K"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "long"
                },
                startDate: {
                    bsonType: "date"
                },
                endDate: {
                    bsonType: "date"
                },
                K: {
                    bsonType: "int"
                }
            }
        }
    }
});

nnn.season.insert([
    {
        _id: NumberLong(1),
        startDate: new Date(2020, 9, 1),
        endDate: new Date(2020, 11, 1),
        K: NumberInt(10)
    }
]);

nnn.createCollection("challenge", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "players"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "long"
                },
                players: {
                    bsonType: "object",
                    required: ["challengingPlayerId", "challengedPlayerId"],
                    additionalProperties: false,
                    properties: {
                        challengingPlayerId: {
                            bsonType: "long"
                        },
                        challengedPlayerId: {
                            bsonType: "long"
                        }
                    }
                },
                title: {
                    bsonType: "string"
                },
                suggestedTime: {
                    bsonType: "date"
                },
                suggestedByPlayerId: {
                    bsonType: "long"
                },
                matchTime: {
                    bsonType: "date"
                },
                reportTime: {
                    bsonType: "date"
                },
                confirmedTime: {
                    bsonType: "date"
                },
                closeTime: {
                    bsonType: "date"
                },
                voidTime: {
                    bsonType: "date"
                },
                rematchedTime: {
                    bsonType: "date"
                },
                rematchRequestedByPlayerId: {
                    bsonType: "long"
                },
                season: {
                    bsonType: "long"
                },
                postseason: {
                    bsonType: "bool"
                },
                stats: {
                    bsonType: "object",
                    additionalProperties: false,
                    properties: {
                        challengingPlayer: {
                            bsonType: "object",
                            additionalProperties: false,
                            properties: {
                                won: {
                                    bsonType: "bool"
                                },
                                depth: {
                                    bsonType: "int"
                                },
                                time: {
                                    bsonType: "int"
                                },
                                completed: {
                                    bsonType: "bool"
                                },
                                comment: {
                                    bsonType: "string"
                                }
                            }
                        },
                        challengedPlayer: {
                            bsonType: "object",
                            additionalProperties: false,
                            properties: {
                                won: {
                                    bsonType: "bool"
                                },
                                depth: {
                                    bsonType: "int"
                                },
                                time: {
                                    bsonType: "int"
                                },
                                completed: {
                                    bsonType: "bool"
                                },
                                comment: {
                                    bsonType: "string"
                                }
                            }
                        }
                    }
                },
                ratings: {
                    bsonType: "object",
                    additionalProperties: false,
                    properties: {
                        challengingPlayerRating: {
                            bsonType: "double"
                        },
                        challengedPlayerRating: {
                            bsonType: "double"
                        },
                        change: {
                            bsonType: "double"
                        }
                    }
                }
            }
        }
    }
});

nnn.createCollection("rating", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "playerId", "season", "rating"],
            additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "objectId"
                },
                playerId: {
                    bsonType: "long"
                },
                season: {
                    bsonType: "long"
                },
                rating: {
                    bsonType: "double"
                }
            }
        }
    }
});

nnn.rating.createIndex({playerId: 1, season: 1}, {unique: true});
