import {Request, Response} from 'express';
import {Driver} from "../db/schema";

export async function getAllDrivers(req: Request, res: Response) {
    try {
        const season = req.params.season

        const drivers = await Driver.find({season})
        if (drivers) {
            res.status(200).json(drivers)
        } else {
            res.status(404).send('No driver found')
        }
    } catch (error: any) {
        res.status(500).send(`Error while trying to retrieve drivers : ` + error.message);
    }
}