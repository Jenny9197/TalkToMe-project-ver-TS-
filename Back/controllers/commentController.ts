import { Request, Response } from 'express';
import { Comment } from '../models';


class commentFunc {
    //댓글조회
    public getComment = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user;
            const { boardId } = req.params;
            const commentList = await Comment.findAll({ where: {boardId: boardId}});
            res.status(200).json({ result: 'success', commentList})
          } catch (error) {
            console.log(error);
            res.status(400).json({
              result: 'fail',
              errormessage: '댓글이 없거나 댓글 등록 할수 없습니다.',
            });
        }
    }
    //댓글등록
    public writeComment = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user;
            const boardId: number = Number(req.params.boardId as String);
            const { comment } = req.body;
            console.log(boardId);
            console.log(userId);
            console.log(comment);
            if (!comment) {
                console.log('커멘트 없음');
                res.status(400).json({ result: 'fail', errormessage: '내용입력하세요' });
                return;
            }
            
            await Comment.create({
                boardId: boardId,
                userId: userId,
                comment: comment,
            });

            // const comments = await Comment.findAll({ where: { boarId: `${boardId}` } });

            res.status(200).json({ result: 'success' });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                result: 'fail',
                msg: '게시글이 없거나 댓글 등록 할수 없습니다.',
            });
        }
    };
    //댓글 삭제
    public deleteComment = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user;
            const { boardId, commentId } = req.params;
            const exComment = await Comment.findOne({
              where: {
                boardId: boardId,
                commentId: commentId,
                userId: userId,
              },
            });
            console.log(boardId, commentId);
            console.log(exComment);
            if (exComment) {
              await Comment.destroy({ where: { boardId: boardId, commentId: commentId, userId: userId } });
              res.status(200).json({ result: 'success', commentId });
            } else {
              res.status(202).json({
                result: 'false',
                msg: '삭제할수 없는 comment입니다.',
              });
              return;
            }
          } catch (error) {
            console.error(error);
            res.status(400).json({
              result: 'fail',
              msg: '댓글삭제 실패.',
            });
          }
    }
    //댓글 수정
    public editComment = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user;
            const { boardId, commentId } = req.params;
            const { comment } = req.body;
        
            const exComment = await Comment.findOne({
              where: {
                boardId: boardId,
                commentId: commentId,
                userId: userId,
              },
            });
            if (exComment) {
              console.log(exComment);
              if (exComment) {
                await Comment.update(
                  {
                    comment: comment,
                  },
                  {
                    where: {
                      boardId: boardId,
                      commentId: commentId,
                      userId: userId,
                    },
                  }
                );
                res.status(200).json({ result: 'success' });
              } else {
                res.status(400).json({ result: 'fail', errormessage: '존재 하지 않는 댓글입니다.' });
              }
            } else {
              //내가 쓴게 아니면
              res.status(400).json({ result: 'fail', errormessage: '수정할수없는 comment입니다.' });
            }
          } catch (error) {
            console.error(error);
            res.status(400).json({
              result: 'fail',
              errormessage: '댓글수정  실패.',
            });
          }
    }
}

module.exports = new commentFunc;