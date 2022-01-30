import * as Sequelize from 'sequelize';
import { config } from;
import { UserFactory } from './userModel';
import { BoardFactory } from './boardModel';
import { CommentFactory } from './commentModel';
import { SelectFactory } from './selectModel';
import { SelectCountFactory } from './selectCountModel';
import { BoardLikeFactory } from './boardLikeModel';
import { isPostfixUnaryExpression } from 'typescript';

export const sequelize = new Sequelize.Sequelize(
    config.rds.database,
    config.rds.username,
    config.rds.password,
    {
        host: config.rds.host,
        dialect: 'mysql',
    }
);

export const User = UserFactory(sequelize);
export const Board = BoardFactory(sequelize);
export const Comment = CommentFactory(sequelize);
export const Select = SelectFactory(sequelize);
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


