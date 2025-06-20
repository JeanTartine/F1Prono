import express from "express";
import {getAllRaces, getNextRace} from "../controllers/raceController";

const router = express.Router()

router.get('/:season', getAllRaces)
router.get('/:season/next', getNextRace)

export default router;