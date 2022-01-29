import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

// These are all the attributes in the User model
interface SelectCountAttributes {
  selectCountId?: Number;
  userId?: Number;
  selectId?: Number;
  optionNum?: String;
}

export interface SelectCountModel extends Model<SelectCountAttributes>, SelectCountAttributes {}
export class SelectCount extends Model<SelectCountModel, SelectCountAttributes> {}

export type SelectCountStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SelectCountModel;
}

export function SelectCountFactory(sequelize: Sequelize): SelectCountStatic {
    return <SelectCountStatic>sequelize.define(
        'SelectCount',
        {
            selectCountId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            selectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            optionNum: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            modelName: "SelectCount",
            tableName: "SelectCounts",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};