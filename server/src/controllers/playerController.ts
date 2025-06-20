import {Request, Response} from 'express';
import {BetGroup, Player} from '../db/schema'

export async function getPlayerById(req: Request, res: Response) {
    const playerId = req.params.playerId
    try {
        const player = await Player.findById(playerId)
        if (player) {
            res.status(200).json(player);
        } else {
            res.status(404).send(`No player found with id ${playerId}`);
        }
    } catch (error) {
        res.status(500).send(`Error while trying to retrieve player with id ${playerId} : ` + error);
    }
}

export async function getGroupsByPlayerId(req: Request, res: Response) {
    const playerId = req.params.playerId
    try {
        const groups = await BetGroup
            .find({
                'players': {$in: playerId}
            })
            .exec();
        res.status(200).json(groups);
    } catch (error: any) {
        res.status(500).send(`Error while trying to retrieve groups for player ${playerId}: ${error.message}` )
    }
}

export async function postPlayer(req: Request, res: Response) {
    try {
        const {name} = req.body;
        const exists = await Player.exists({name: name})
        if (exists) {
            res.status(400).json({error: "Player already exists"})
            return;
        }
        const player = await Player.create({name: name})
        res.status(200).json(player);
    } catch (e: any) {
        res.status(500).send(`Error while trying to create new player: ` + e.message)
    }
}
