import express from 'express';
const router = express.Router({mergeParams: true});
import commentController from '../controllers/commentController';
import { logInOnly } from '../middlewares/passportmiddlewares';

router.get('/', commentController.getComment);

router.post('/', logInOnly, commentController.writeComment);

router.delete('/:commentId', logInOnly, commentController.deleteComment);

router.patch('/:commentId', logInOnly, commentController.editComment);
 
export default router;