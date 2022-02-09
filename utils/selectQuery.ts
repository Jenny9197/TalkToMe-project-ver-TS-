import sequelize from "../Back/models";
import { QueryTypes } from "sequelize/dist";

exports.PopBoardHomeLogin = async function (user_id) {
    const query = ``;
  
    return await sequelize.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
};