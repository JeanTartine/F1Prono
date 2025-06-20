
import { Request, Response } from 'express';
import { BetGroup } from "../db/schema";

export async function getGroupById(req: Request, res: Response): Promise<void> {
    const groupId = req.params.groupId
    try {
        const group = await BetGroup.findById(groupId)
            .populate('players').exec();
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).send('Group Not Found');
        }

    } catch (error) {
        let message
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error)
        }
        res.status(500).send('Error while trying to get the group ' + message);
    }
}

export async function postGroup(req: Request, res: Response): Promise<void> {
    try {
        const {groupName, playerId} = req.body
        const currentSeason = new Date().getFullYear().toString()

        const group = await BetGroup.create({name: groupName, season: currentSeason})
        const updatedGroup = await BetGroup
            .findByIdAndUpdate(
                group._id,
                {$push: { players:  playerId } },
                {new: true}
            )
            .populate("players").exec()

        res.status(200).json(updatedGroup);
    } catch (error) {
        let message
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error)
        }
        res.status(500).send('Error while trying to create a new group: ' + message);
    }
}

export async function addPlayerToGroup(req: Request, res: Response): Promise<void> {
    const groupId = req.params.groupId
    const playerId = req.params.playerId
    try {
        const betGroup = await BetGroup
            .findByIdAndUpdate(
                groupId,
                {$addToSet: { players: playerId } },
                {new: true},
            )
            .populate('players')
            .exec()
        res.status(200).json(betGroup);
    } catch (error) {
        let message
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error)
        }
        res.status(500).send(`Error while trying to add player ${playerId} to the group${groupId}: ` + message);
    }
}