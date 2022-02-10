import express from 'express';

import boardController from "../controllers/boardController";
import { logInOnly } from '../middlewares/passportmiddlewares';

import comment from '../routes/comment';
const router = express.Router();

// 고민작성페이지
router.post('/write', logInOnly, boardController.postCreate);
// 고민상세페이지 - 게시글 상세 조회
router.get('/:boardId', boardController.postView);   
// 고민상세페이지 - 게시글 좋아요, 취소
router.post('/:boardId/like', logInOnly, boardController.postOrLike);
// 고민 게시글 수정
router.patch('/:boardId', logInOnly, boardController.editBoard);
// 고민 게시글 삭제
router.delete('/:boardId', logInOnly, boardController.deleteBoard);
//  고민게시글 목록 조회 - 메인페이지
router.get('/', boardController.postMainView);

router.use('/:boardId/comment', comment);

export default router;
