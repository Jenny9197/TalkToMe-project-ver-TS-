import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface BoardLikeAttributes {
    boardLikeId?: Number;
    userId?: Number;
    boardId?: Number;
}

export interface BoardLikeModel extends Model<BoardLikeAttributes>, BoardLikeAttributes {}
export class Board extends Model<BoardLikeModel, BoardLikeAttributes> {}

export type BoardLikeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BoardLikeModel;
}

export function BoardLikeFactory(sequelize: Sequelize): BoardLikeStatic {
    return <BoardLikeStatic>sequelize.define(
        'BoardLike',
        {
            boardLikeId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            boardId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            modelName: "BoardLike",
            tableName: "BoardLikes",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};