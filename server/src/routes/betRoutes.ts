
import express from 'express';
import {getABet, postPlayerBet} from "../controllers/betController";

const router = express.Router();

router.get("/:betId", getABet);
router.post("/add", postPlayerBet)

export default router;