import { Request, Response } from "express";
import sequelize from '../models';
import { QueryTypes } from "sequelize/dist";

class searchFunc {
    public homeSearchFunc = async (req:Request, res:Response) => {
        try {
            const user_Id = req.user;
            const { keyword, group } = req.query ;
            if(!keyword){
                return res.status(400).send({messge:"keyword가 있어야 됩니다."})
            }
            console.log(group == 'board');
            const keywords = (keyword as string).split(' ')
            
            if (group == 'board') {
                let query = `SELECT s.boardId, s.boardTitle, s.boardViewCount, count(c.commentId) as commentCount, s.createdAt
                FROM boards AS s
                left OUTER JOIN comments AS c
                ON s.boardId = c.boardId
                WHERE MATCH (boardTitle,boardDesc) AGAINST ('${keywords}' IN NATURAL LANGUAGE MODE)
                GROUP BY s.boardId
                ORDER BY s.createdAt DESC`
                const searchList = await sequelize.sequelize.query(query, {
                    type: QueryTypes.SELECT,
                });
                
                res.json({ result: 'success', searchList, group: group });
                
            } else if (group == 'select') {
                let query = `SELECT s.selectId, s.selectViewCount, s.selectTitle, s.selectDesc, s.createdAt, s.endDate,count(c.selectId) as participationCount
                FROM selects AS s
                left OUTER JOIN selectCounts AS c
                ON s.selectId = c.selectId
                WHERE MATCH (selectTitle,selectDesc) AGAINST ('${keywords}' IN NATURAL LANGUAGE MODE)
                GROUP BY s.selectId
                ORDER BY s.createdAt DESC`
                
                const searchList = await sequelize.sequelize.query(query, {
                    type: QueryTypes.SELECT,
                });
                
                res.json({ result: 'success', searchList, group: group });
            } else {
                res.json({ result: 'fail', msg: '잘못된 요청입니다.'})
            }
            
            
        } catch (err) {
            console.log(err)
            res.status(400).send({
                msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
            });
        }
    };
}


export = new searchFunc();