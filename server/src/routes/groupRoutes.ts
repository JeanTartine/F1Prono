import express from 'express';
import { getGroupById } from '../controllers/groupController';

const router = express.Router();

router.get("/:groupId", getGroupById);

export default router;