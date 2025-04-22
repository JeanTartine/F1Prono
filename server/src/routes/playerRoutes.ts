import express from "express";
import {getPlayerById, getPlayersByGroup, postPlayer} from "../controllers/playerController";

const router = express.Router();

router.get("/:playerId", getPlayerById)
router.get("/group/:groupId", getPlayersByGroup);
router.post("/add", postPlayer)

export default router;