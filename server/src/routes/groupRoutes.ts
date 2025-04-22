import express from 'express';
import {getGroupById, postGroup} from '../controllers/groupController';

const router = express.Router();

router.get("/:groupId", getGroupById);
router.post("/add", postGroup);
export default router;