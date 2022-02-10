import express from 'express';
const router = express.Router();

import userRouter from './user';
import boardRouter from './board';
import commentRouter from './comment';
import selectRouter from './select';
import searchRouter from './search';

router.use('/user', [userRouter]);
router.use('/board', [boardRouter]);
router.use('/comment', [commentRouter]);
router.use('/select', [selectRouter]);
router.use('/search', [searchRouter]);

export default router;