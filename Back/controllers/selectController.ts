import { Request, Response } from "express";
import { User, Selects, SelectCount } from '../models';
import sequelize from "../models";
import { QueryTypes } from "sequelize/dist";



class selectFunc {
    public getSelects = async (req: Request, res: Response) => {
        try {
          // const userId = res.locals.user.userId;
          let { sort } = req.query;
          console.log(sort)
          if(sort == 'viewCount') {
            sort = 'selectViewCount';
          } else {
            sort = 'createdAt';
          }
          const query = `SELECT s.selectId, s.selectViewCount, s.selectTitle, s.selectDesc, s.createdAt, s.endDate,count(c.selectId) as participationCount
          FROM selects AS s
          left OUTER JOIN selectCounts AS c
          ON s.selectId = c.selectId
          GROUP BY s.selectId
          ORDER BY s.${sort} DESC`
          
          const selectsList = await sequelize.sequelize.query(query, {
            type: QueryTypes.SELECT,
          });
          
          res.json({result: 'success', selectsList})
        } catch (error) {
          console.error(error);
          res.status(400).json(() => {
            result: 'fail';
            msg: '게시글 목록을 불러오는데 실패하였습니다.';
          });
        }
    };

    public writeSelect = async (req: Request, res: Response) => {
      try {
        const userId = res.locals.user;
        const { selectTitle, selectDesc, option1, option2, option3, option4, option5, endDate } = req.body;
        const selectInfo = { selectTitle, selectDesc, option1, option2, option3, option4, option5, endDate };
        await Selects.create(selectInfo);
        res.status(200).json({ result: 'success', selectInfo})
      } catch (error) {
        console.error(error);
        res.status(400).json(() => {
          result: 'fail';
          msg: '게시글 목록을 불러오는데 실패하였습니다.';
        });
      }
    };
    
  public getSelect = async (req: Request, res: Response) => {
      try {
          const userId = res.locals.user;
          const { selectId } = req.params;
          console.log(userId)
          
          console.log('여기',req.headers.cookie);
          if (req.cookies['s' + selectId] == undefined) {
          res.cookie('s' + selectId, this.getUserIP(req), {
              maxAge: 720000, //12분
              // maxAge: 1200000,
          });
          await Selects.increment({ selectViewCount: +1 }, { where: { selectId } });
          }
          
          const query = `SELECT t1.selectId, t1.nickname, t1.userId, selectState, t1.selectViewCount, t1.selectTitle, t1.selectDesc, t1.createdAt, t1.option1, t1.option2, t1.option3, t1.option4, t1.option5, t1.participationCount, json_arrayagg(JSON_OBJECT(IFNULL(t2.optionNum,"none"), t2.count))as optionCount
          from
          (SELECT s.selectId, u.nickname, s.userId, s.selectViewCount, s.selectTitle, s.selectDesc, s.createdAt, option1, option2, option3, option4, option5, count(c.selectId) as participationCount
          FROM selects AS s
          left OUTER JOIN selectCounts AS c
          ON s.selectId = c.selectId
          left OUTER JOIN users as u
          ON s.userId = u.userId
          where s.selectId =${selectId}
          GROUP BY s.selectId
          ORDER BY s.createdAt DESC) as t1
          left outer join
          (SELECT s.selectId, c.optionNum, count(c.optionNum) as count,
          case c.userId
      when ${userId} then c.optionNum
      else 'false'
      end as selectState
          FROM selectCounts AS c
          left OUTER JOIN selects AS s
          ON c.selectId = s.selectId
          WHERE c.selectId =${selectId}
          GROUP BY c.optionNum
          ORDER BY s.createdAt DESC) as t2
          ON t1.selectId = t2.selectId`
      
          const selectList:any = await sequelize.sequelize.query(query, {
            type: QueryTypes.SELECT,
          });
          selectList[0].logInUserId = userId
          res.status(200).json({ result: 'success', selectList })  
      } catch (error) {
          console.error(error);
          res.status(400).json(() => {
          result: 'fail';
          msg: '게시글 목록을 불러오는데 실패하였습니다.';
          });
      }
  };
    
  public getUserIP(req: Request) {
      console.log(req.headers);
      const addr = req.headers['x-forwarded-for'];
      return addr;
  }
    
  public doSelect = async (req: Request, res: Response)  => {
      try {
          const userId = res.locals.user;
          const { selectId } = req.params;
          const { optionNum } = req.body;
          if(!selectId){
            return res.status(400).send({messge: "selectId가 존재하지 않습니다."})
          }
          const exUser = await SelectCount.findOne({where: {userId: userId, selectId: selectId}})
      
          if (exUser) {
            await SelectCount.update({optionNum: optionNum},{where: {userId: userId, selectId: selectId} })
          } else {
            await SelectCount.create({userId: userId, selectId: parseInt(selectId)  , optionNum: optionNum})
          }
          res.status(200).json({ result: 'success' })
      } catch (error) {
        console.error(error);
        res.status(400).json(() => {
          result: 'fail';
          msg: '투표에 실패 했습니다.';
        });
      }
  };
    
  public editSelect = async (req: Request, res: Response) => {
      try {
          const userId = res.locals.user;
          const { selectId } = req.params;
          const { selectTitle, selectDesc, option1, option2, option3, option4, option5, endDate } = req.body;
          const exSelect = await Selects.findOne({where: { selectId: selectId, userId: userId }})
          if (exSelect) {
          await Selects.update(
              { selectTitle, selectDesc, option1, option2, option3, option4, option5, endDate },
              { where: { selectId } }
          );
            res.status(200).json({ result: 'success', msg: '수정완료'})
            return;
          } else {
            res.status(200).json({ result: 'fail', msg: '수정할 수 없는 게시물 입니다.'})
            return;
          }
          
      
          res.json({ result: 'success' });
      } catch (err) {
          console.log(err);
          res.status(400).send({
            msg: '게시글 수정에 실패했습니다.',
          });
      }
  };
    
  public deleteSelect = async (req: Request, res: Response) => {
      try {
          const userId = res.locals.user;
          const { selectId } = req.params;
      
          const exSelect = await Selects.findOne({where: { selectId: selectId, userId: userId }})
          if (exSelect) {
            await Selects.destroy({ where: {selectId:selectId} });
            res.status(200).json({ result: 'success' });
            return;
          } else {
            res.status(200).json({ result: 'fail', msg: '삭제할 수 없는 게시물 입니다.'});
            return;
          }
          res.json({ result: 'success' });
      } catch (err) {
          console.log(err);
          res.status(400).send({
            msg: '게시글 삭제에 실패했습니다.',
          });
      }
  };
}
  
  
export = new selectFunc();