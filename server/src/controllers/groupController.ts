import { Request, Response } from 'express';
import pool from "../../database";
import {BetGroup} from "../models/BetGroup";
import {QueryResult} from 'pg';

export async function getGroupById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.groupId)
    try {
        const result: QueryResult  = await pool.query(
            'SELECT * FROM bet_group WHERE id = $1',
            [id]
        );

        if (result.rows.length > 0) {
            const betGroup = result.rows[0] as BetGroup;
            res.status(200).json(betGroup);
        } else {
            res.status(404).send('Group Not Found');
        }

    } catch (error) {
        res.status(500).send(`Error while trying to get the group with id : ${id}`);
    }
}

export async function postGroup(req: Request, res: Response): Promise<void> {
    try {
        const {groupName} = req.body
        await pool.query(
            'INSERT INTO bet_group(group_name) VALUES ($1)',[groupName]
        );

        res.status(200).json('Group created');

    } catch (error) {
        res.status(500).send('Error while trying to create a new group');
    }
}


