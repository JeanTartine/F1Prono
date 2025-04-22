import { Request, Response } from 'express';
import pool from "../../database";
import {QueryResult} from "pg";
import {Player} from "../models/Player";


export async function getPlayerById(req: Request, res: Response) {
    const playerId = Number(req.params.playerId)

    try {
        const result: QueryResult = await pool.query(
            'SELECT * FROM player WHERE id = $1',
            [playerId]
        )

        if (result.rows.length > 0) {
            const players = result.rows[0] as Player;
            res.status(200).json(players);
        } else {
            res.status(404).send(`No player found for the group with id ${playerId}`);
        }
    } catch (error) {
        res.status(500).send(`Error while trying to retrieve player with id ${playerId}`);
    }
}

export async function getPlayersByGroup(req: Request, res: Response) {
    const groupId = Number(req.params.groupId)

    try {
        const result: QueryResult = await pool.query(
            'SELECT * FROM player INNER JOIN join_player_bet_group jt ON jt.player_id = player.id ' +
            'INNER JOIN bet_group ON jt.group_id = bet_group.id ' +
            'WHERE bet_group.id = $1',
            [groupId]
        )

        if (result.rows.length > 0) {
            const players = result.rows as Player[];
            res.status(200).json(players);
        } else {
            res.status(404).send(`No player found for the group with id ${groupId}`);
        }
    } catch (error) {
        res.status(500).send(`Error while trying to retrieve players from group ${groupId}`);
    }
}

export async function postPlayer(req: Request, res: Response) {
    try {
        const {name} = req.body;
        await pool.query(
            'INSERT INTO player(name) VALUES ($1)',
            [name]
        )
        res.status(200).json('Player created');
    } catch (e) {
        res.status(500).send(`Error while trying to create new player`)
    }
}