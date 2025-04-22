import { Request, Response } from 'express';
import {QueryResult} from "pg";
import {Bet} from "../models/Bet";
import pool from "../../database";

export async function getAllPlayerBetsForGroup(req: Request, res: Response): Promise<void> {
    const groupId = Number(req.params.groupId)
    const playerId = Number(req.params.groupId)
    try {
        const result: QueryResult = await pool.query(
            'SELECT * FROM bet INNER JOIN bet_group ON bet.bet_group_id = bet_group.id ' +
            'INNER JOIN player ON bet.player_id = player.id ' +
            'WHERE bet_group.id = $1 AND player.id = $2 ',
            [groupId, playerId]
        );

        if(result.rows.length > 0) {
            const betGroup = result.rows as Bet[];
            res.status(200).json(betGroup);
        } else {
            res.status(404).send('Not Bets Found')
        }
    } catch (e) {
        res.status(500).send(`Erro*r while trying to get the bets for player ${playerId} in group ${groupId}`)
    }
}

export async function postPlayerBet(req: Request, res: Response): Promise<void> {
    try {
        const {raceName, position, driverId, playerId, groupId} = req.body;
        await pool.query(
            'INSERT INTO bet(race_name, position, driver_id, bet_group_id, player_id) VALUES($1, $2, $3, $4, $5)',
            [raceName, position, driverId, groupId, playerId]
        )
        res.status(200).json('Bet created')
    } catch (e) {
        res.status(500).send(`Error while trying to create new bet`)
    }
}