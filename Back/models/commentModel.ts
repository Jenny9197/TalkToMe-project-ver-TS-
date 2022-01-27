import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface CommentAttributes {
    commentId?: Number;
    userId?: Number;
    boardId?: Number;
    comment?: String;
}

export interface CommentModel extends Model<CommentAttributes>, CommentAttributes {}
export class Comment extends Model<CommentModel, CommentAttributes> {}

export type CommentStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CommentModel;
}

export function CommentFactory(sequelize: Sequelize): CommentStatic {
    return <CommentStatic>sequelize.define(
        'Comment',
        {
            commentId: {
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
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            modelName: "Comment",
            tableName: "Comments",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};