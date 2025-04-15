import { Request, Response } from 'express';
import pool from "../../database";

export async function getGroupById(req: Request, res: Response) {
    try {
        console.log("test")
        const id = Number(req.params.groupId)
        console.log(id)
        return await pool.query(`SELECT * FROM bet_group WHERE id = ${id}`, (error, result) => {
            if (result.rows.length > 0) {
                return res.status(200).send(result.rows[0]);
            }

            return res.status(404).send('Group Not Found')

        });
    } catch (error) {
        console.log(error)
    }
}

