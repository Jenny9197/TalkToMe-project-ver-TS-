import * as Sequelize from 'sequelize';
import { config } from '../config/config';
import { UserFactory } from './userModel';
import { BoardFactory } from './boardModel';
import { CommentFactory } from './commentModel';
import { SelectFactory, Select } from './selectModel';
import { SelectCountFactory } from './selectCountModel';
import { BoardLikeFactory } from './boardLikeModel';

const sequelize = new Sequelize.Sequelize(
   config.development.database,
   config.development.username,
   config.development.password,  
   {
       host: config.development.host,
       dialect: 'mysql',
   }
);

export const User = UserFactory(sequelize);
export const Board = BoardFactory(sequelize);
export const Comment = CommentFactory(sequelize);
export const Selects = SelectFactory(sequelize);
export const SelectCount = SelectCountFactory(sequelize);
export const BoardLike = BoardLikeFactory(sequelize);

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
Board.hasMany(Selects, {
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

//Comment table
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
Comment.hasMany(Selects, {
    foreignKey: "commentId",
    sourceKey: "commentId",
});
Comment.hasMany(SelectCount, {
    foreignKey: "commentId",
    sourceKey: "commentId",
});

//Select table
Select.belongsTo(User, {
    foreignKey: "selectId",
    targetKey: "selectId",
    onDelete: "cascade",
});
Select.hasMany(SelectCount, {
    foreignKey: "selectId",
    sourceKey: "selectId",
});

//SelectCount table
SelectCount.belongsTo(User, {
    foreignKey: "selectCountId",
    targetKey: "selectCountId",
    onDelete: "cascade",
});
SelectCount.hasMany(Selects, {
    foreignKey: "selectCountId",
    sourceKey: "selectCountId",
});

//BoardLike table
BoardLike.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "userId",
    onDelete: "cascade",
});
BoardLike.hasMany(Board, {
    foreignKey: "boardLikeId",
    sourceKey: "boardLikeId",
});

export default {sequelize, User, Board, Comment, Select, SelectCount, BoardLike};