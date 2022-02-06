import { Request, Response } from "express";
import { Board, BoardLike } from "../models";
import sequelize  from "../models";

//고민 작성 페이지 - 게시글 작성
class boardFunc {
  public postCreate = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user;
      const { boardTitle, boardDesc } = req.body;

      const date = new Date();

      const board = await Board.create({
        boardTitle,
        boardDesc,
        userId,
      });

      const message = "게시물 작성에 성공했습니다.";
      return res.status(200).send({
        board,
        message,
        date,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(() => {
        result: "fail";
        msg: "알 수 없는 문제가 발생했습니다.";
      });
    }
  };
  //고민 상세 페이지 - 게시글 상세 조회
  public postView = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user;
      const { boardId } = req.params;

      if (req.cookies["s" + boardId] == undefined) {
        res.cookie("s" + boardId, this.getUserIP(req), {
          maxAge: 720000, //12분 // maxAge: 1200000,
        });
        await Board.increment({ BoardViewCount: +1 }, { where: { boardId } });
      }
      //닉네임 추가
      const query = `SELECT s.boardId, u.userId, u.nickname, s.boardTitle, s.boardDesc, s.boardViewCount, count(c.commentId) as commentCount, s.updatedAt
            FROM boards AS s
            left OUTER JOIN comments AS c
            ON s.boardId = c.boardId
              left OUTER JOIN users as u
              ON u.userId = s.userId
              where s.boardId = ${boardId}
            GROUP BY s.boardId
            ORDER BY s.createdAt DESC`;

      const boardList = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });
      return res.status(200).send({
        boardList,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(() => {
        result: "fail";
        msg: "알 수 없는 문제가 발생했습니다.";
      });
    }
  };

  //게시글 좋아요/취소
  public postOrLike = async (req: Request, res: Response) => {
    try {
      const { boardId } = req.params;
      const userId = res.locals.user;
      //console.log(boardId, userId);

      const postLike = await BoardLike.findOne({
        where: { userId, boardId },
      });
      if (!postLike) {
        await BoardLike.create({
          userId,
          boardId,
        });
        const message = "게시글 좋아요.";
        return res.status(200).send({
          isLiked: true,
          message,
        });
      } else {
        await BoardLike.destroy({
          where: { userId, boardId },
        });

        const message = "게시물 좋아요 취소";
        return res.status(200).send({
          isLiked: false,
          message,
        });
      }
    } catch (error) {
      console.log(error);
      const message = "관리자에게 문의해주세요";
      return res.status(500).send({ message });
    }
  };
  //게시물 메인 페이지 조회파트
  public postMainView = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user;
      //로우쿼리방식으로 sort 로 진행하기
      let { sort } = req.query;
      console.log(sort);
      if (sort == "viewCount") {
        sort = "s.boardViewCount";
      } else if (sort == "commentCount") {
        sort = "count(c.commentId)";
      } else {
        sort = "s.createdAt";
      }
      const query = `SELECT s.boardId, s.boardTitle, s.boardViewCount, count(c.commentId) as commentCount, s.createdAt
                        FROM boards AS s
                        left OUTER JOIN comments AS c
                        ON s.boardId = c.boardId
                        GROUP BY s.boardId
                        ORDER BY ${sort} DESC`;

      const boardViewList = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });

      res.status(200).send({
        boardViewList,
        userId,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(() => {
        result: "fail";
        msg: "알 수 없는 문제가 발생했습니다.";
      });
    }
  };
  public editBoard = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user;
      const { boardId } = req.params;
      const { boardTitle, boardDesc } = req.body;
      const exBoard = await Board.findOne({
        where: { boardId: boardId, userId: userId },
      });
      if (exBoard) {
        await Board.update({ boardTitle, boardDesc }, { where: { boardId } });
        res.status(200).json({ result: "success", msg: "수정완료" });
        return;
      } else {
        res
          .status(200)
          .json({ result: "fail", msg: "수정할 수 없는 게시물 입니다." });
        return;
      }

      res.json({ result: "success" });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        msg: "게시글 수정에 실패했습니다.",
      });
    }
  };

  public deleteBoard = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user;
      const { boardId } = req.params;

      const exBoard = await Board.findOne({
        where: { boardId: boardId, userId: userId },
      });
      if (exBoard) {
        await Board.destroy({ where: { boardId: boardId } });
        res.status(200).json({ result: "success" });
        return;
      } else {
        res
          .status(200)
          .json({ result: "fail", msg: "삭제할 수 없는 게시물 입니다." });
        return;
      }

      res.json({ result: "success" });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        msg: "게시글 삭제에 실패했습니다.",
      });
    }
  };

  public getUserIP(req: Request) {
    console.log(req.headers);
    const addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    return addr;
  }
}

module.exports = new boardFunc();
