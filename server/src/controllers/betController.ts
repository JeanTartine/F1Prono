import {Request, Response} from 'express';
import * as BetModel from "../models/Bet";
import {Bet, BetGroup, BetLine, Player} from "../db/schema";
import mongoose from "mongoose";


export async function getAllBetsFromGroup(req: Request, res: Response): Promise<void> {
    const groupId = req.params.groupId
    try {
        const exists = BetGroup.exists({_id: groupId})
        if (!exists) {
            throw new Error("BetGroup does not exist");
        }
        const bet = await Bet
            .find({betGroup: groupId})
            .populate({
                path: 'betLines',
                populate: ('driver')
            })
            .populate("player")
            .populate("betResult")
            .exec()
        res.status(200).json(bet);
    } catch (e: any) {
        res.status(500).send(`Error while trying to get the bets for group ${groupId}: ${e.message}`)
    }
}

export async function getABet(req: Request, res: Response): Promise<void> {
    try {
        const betId = req.params.betId
        const bet = await Bet
            .findById(betId)
            .populate({
                path: 'betLines',
                populate: ('driver')
            })
            .populate("player")
            .populate("betGroup")
            .populate("betResult")
            .exec()
        res.status(200).json(bet);
    } catch (e) {
        res.status(500).send(`Error while trying to get bet lines: ` + e)
    }
}


export async function postPlayerBet(req: Request, res: Response): Promise<void> {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();


        const betRequest: BetModel.Bet = req.body;
        const newBet = new Bet({
            raceName: betRequest.raceName,
            player: betRequest.playerId,
            betGroup: betRequest.groupId,
            betResult: betRequest?.resultId,
            betLines: []
        })

        // Check if Player and BetGroup exist
        const [playerExists, betGroupExists] = await Promise.all([
            Player.exists({_id: betRequest.playerId}),
            BetGroup.exists({_id: betRequest.groupId})
        ]);

        if (!playerExists) {
            throw new Error(`The player ${betRequest.playerId} doesn't exist`)
        }

        if (!betGroupExists) {
            throw new Error(`The group ${betRequest.groupId} doesn't exist`)
        }

        // Save the Bet to get its _id
        await newBet.save({session});

        //Create BetLines with reference to the new Bet
        const betLinePromises = betRequest.betLines.map(lineData => {
            const betLine = new BetLine({
                driver: lineData.driverId,
                position: lineData.position,
                driverStatus: lineData.driverStatus,
                bet: newBet._id // Reference to the Bet
            });
            return betLine.save({session});
        });

        const savedBetLines = await Promise.all(betLinePromises);

        //Update the Bet with references to BetLines
        newBet.betLines = savedBetLines.map(line => line._id);
        await newBet.save({session});

        // Commit the transaction
        await session.commitTransaction();
        await session.endSession();

        // Return the Bet
        const populatedBet = await Bet.findById(newBet._id)
            .populate({
                path: 'betLines',
                populate: ('driver')
            })
            .populate('betResult')
            .exec();

        res.status(200).json(populatedBet)
    } catch (e: any) {
        res.status(500).send(`Error while trying to create new bet: ${e.message}`)
    }
}
