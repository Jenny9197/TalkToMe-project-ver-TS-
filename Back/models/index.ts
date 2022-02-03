import * as Sequelize from 'sequelize';
import { config } from '../config/config';
import { UserFactory } from './userModel';
import { BoardFactory } from './boardModel';
import { CommentFactory } from './commentModel';
import { SelectFactory } from './selectModel';
import { SelectCountFactory } from './selectCountModel';
import { BoardLikeFactory } from './boardLikeModel';

const db = {};
const sequelize = new Sequelize.Sequelize(
    config.database, config.username, config.password,
    {
        host: config.host,
        dialect: 'mysql',
    }
);

export const userModel = UserFactory(sequelize);
export const boardModel = BoardFactory(sequelize);
export const selectModel = SelectFactory(sequelize);
export const selectCountModel = SelectCountFactory(sequelize);
export const commentModel = CommentFactory(sequelize);
export const boardLikeModel = BoardLikeFactory(sequelize);

module.exports = db;

export const User = UserFactory(db);
export const Board = BoardFactory(db);
export const Comment = CommentFactory(Sequelize);
export const Select = SelectFactory(Sequelize);
export const SelectCount = SelectCountFactory(Sequelize);
export const BoardLike = BoardLikeFactory(Sequelize);

// User Table relationship set
    User.hasMany(Board, {
        foreignKey: "userId",
        sourceKey: "userId",
    });
    User.hasMany(Comment, {
        foreignKey: "userId",
        sourceKey: "userId",
    });
    User.hasMany(Select, {
        foreignKey: "userId",
        sourceKey: "userId",
    });
    User.hasMany(SelectCount, {
        foreignKey: "userId",
        sourceKey: "userId",
    });
    User.hasMany(BoardLike, {
        foreignKey: "userId",
        sourceKey: "userId",
    });
    // Board table
    Board.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "userId",
        onDelete: "cascade",
    });

    Board.hasMany(Comment, {
        foreignKey: "boardId",
        sourceKey: "boardId",
    });

    Board.hasMany(Select, {
        foreignKey: "boardId",
        sourceKey: "boardId",
    });

    Board.hasMany(SelectCount, {
        foreignKey: "boardId",
        sourceKey: "boardId",
    });

    Board.hasMany(BoardLike, {
        foreignKey: "boardId",
        sourceKey: "boardId",
    });

    Comment.belongsTo(Board, {
        foreignKey: "commentId",
        targetKey: "commentId",
        onDelete: "cascade",
    });
    Comment.hasMany(Board, {
        foreignKey: "commentId",
        sourceKey: "commentId",
    });
    Comment.hasMany(BoardLike, {
        foreignKey: "commentId",
        sourceKey: "commentId",
    });
    Comment.hasMany(Select, {
        foreignKey: "commentId",
        sourceKey: "commentId",
    });
    Comment.hasMany(SelectCount, {
        foreignKey: "commentId",
        sourceKey: "commentId",
    });
    Select.belongsTo(User,)

