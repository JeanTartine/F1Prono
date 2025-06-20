
import express from 'express';
import {addPlayerToGroup, getGroupById, postGroup} from '../controllers/groupController';
import {getAllBetsFromGroup} from "../controllers/betController";

const router = express.Router();

router.get("/:groupId", getGroupById);
router.get("/:groupId/bets", getAllBetsFromGroup);

router.post("/add", postGroup);
router.patch('/:groupId/player/:playerId', addPlayerToGroup);

export default router;
