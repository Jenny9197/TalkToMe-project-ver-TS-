import express from 'express';
const router = express.Router();
import selectController from "../controllers/selectController";
import { logInOnly } from "../middlewares/passportmiddlewares";

router.get('/', selectController.getSelects) //게시글 전체 조회
router.post('/write', logInOnly, selectController.writeSelect); //게시글 작성
router.get('/:selectId', logInOnly,selectController.getSelect); //게시글 상세 조회
router.patch('/:selectId', logInOnly, selectController.editSelect); //게시글 수정
router.delete('/:selectId', logInOnly, selectController.deleteSelect); //게시글 삭제
router.post('/:selectId', logInOnly, selectController.doSelect); //투표

export default router;