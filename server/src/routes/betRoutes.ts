import express from 'express';
import {getAllPlayerBetsForGroup, postPlayerBet} from "../controllers/betController";

const router = express.Router();

router.get("/group/:groupId/player/:playerId", getAllPlayerBetsForGroup);
router.post("/add", postPlayerBet)

export default router;