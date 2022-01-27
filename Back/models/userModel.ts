import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

interface UserAttributes {
    userId?: Number;
    email?: String;
    nickname?: String;
    refreshtoken?: String;
    provider?: String;
    snsId?: String;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
}

export function UserFactory(sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define(
        'User',
        {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING(40),
                allowNull: true,
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'temporary',
            },
            refreshtoken: {
                type: DataTypes.STRING(20),
            },
            provider: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            snsId: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
        },
        {
            modelName: "User",
            tableName: "User",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};