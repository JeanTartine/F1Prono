import express from "express";
import {Race} from "../db/schema";
import {Request, Response} from 'express';

//Get all races
export async function getAllRaces(req: Request, res: Response) {
    try {
        const season = req.params.season
        const races = await Race
            .find({season})
            .sort({ round: 1})
        if (races) {
            res.status(200).json(races);
        } else {
            res.status(404).send("No races found!");
        }
    } catch (error: any) {
        res.status(500).send('Error while trying to retrieve the races list: ' + error.message);
    }
}

export async function getNextRace(req: Request, res: Response) {
    try {
        const today = new Date();
        let nextRace = null
        const races = await Race
            .find()
            .sort({ round: 1})
        races.some((race) => {
            const raceDateUTC = new Date(`${race.date}T${race.time}`);
            if (raceDateUTC > today) {
                nextRace = race;
                return true;
            }
        })
        res.status(200).json(nextRace);
    } catch (error: any) {
        res.status(500).send('Error while trying to retrieve the next race: ' + error.message);
    }
}