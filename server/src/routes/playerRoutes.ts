import express from "express";
import {getGroupsByPlayerId, getPlayerById, postPlayer} from "../controllers/playerController";

const router = express.Router();

router.get("/:playerId", getPlayerById)
router.get("/:playerId/groups", getGroupsByPlayerId)
router.post("/add", postPlayer)

export default router;