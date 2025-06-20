import {model, Schema, SchemaTypes} from "mongoose";

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})

const betGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    players: [{
        type: SchemaTypes.ObjectId,
        ref: "Player",
    }]
})

const betLineSchema = new Schema({
    driver: {
        type: SchemaTypes.ObjectId,
        ref: "Driver"
    },
    position: {
        type: Number,
        required: true,
    },
    driverStatus: {
        type: String,
        required: true,
    },
    bet: {
        type: SchemaTypes.ObjectId,
        ref: "Bet"
    }
})

const betSchema = new Schema({
    raceName: {
        type: String,
        required: true,
    },
    player: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Player",
    },
    betGroup: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "BetGroup",
    },
    betResult: {
        type: SchemaTypes.ObjectId,
        ref: "BetResult",
    },
    betLines: [{
        type: SchemaTypes.ObjectId,
        ref: "BetLine"
    }]
})

const betResultSchema = new Schema({
   longestStreak: {
       type: Number,
       required: true,
   },
    correctGuesses: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    bet: {
        type: SchemaTypes.ObjectId,
        ref: "Bet"
    }
})

const raceSchema = new Schema({
    season: {
        type: String
    },
    round: {
        type: Number,
    },
    url: {
        type: String,
    },
    raceName: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
})

const driverSchema = new Schema({
    driverId: {
        type: String,
    },
    permanentNumber: {
        type: String,
    },
    code: {
        type: String,
    },
    url: {
        type: String,
    },
    givenName: {
        type: String,
    },
    familyName: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    nationality: {
        type: String,
    },
    season: {
        type: String,
    }
})

export const Player = model('Player', playerSchema, 'players')
export const BetGroup = model('BetGroup', betGroupSchema, 'bet_groups')
export const BetLine = model('BetLine', betLineSchema, 'bet_lines')
export const Bet = model('Bet', betSchema, 'bets')
export const BetResult = model('BetResult', betResultSchema, 'bet_results')
export const Race = model('Race', raceSchema, 'races')
export const Driver = model('Driver', driverSchema, 'drivers')