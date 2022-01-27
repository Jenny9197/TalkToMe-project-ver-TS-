import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface BoardAttributes {
    boardId?: Number;
    userId?: Number;
    boardTitle?: String;
    boardDesc?: String;
    boardViewCount?: Number;
}

export interface BoardModel extends Model<BoardAttributes>, BoardAttributes {}
export class Board extends Model<BoardModel, BoardAttributes> {}

export type BoardStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BoardModel;
}

export function BoardFactory(sequelize: Sequelize): BoardStatic {
    return <BoardStatic>sequelize.define(
        'Board',
        {
            boardId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            boardTitle: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            boardDesc: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            boardViewCount: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            modelName: "Board",
            tableName: "Boards",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};