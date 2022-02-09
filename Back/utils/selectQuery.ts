import sequelize from "../models";
import { QueryTypes } from "sequelize/dist";

exports.PopBoardHomeLogin = async function (user_id: any) {
    const query = ``;
  
    return await sequelize.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
};