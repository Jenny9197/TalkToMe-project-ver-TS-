import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

// These are all the attributes in the User model
interface SelectAttributes {
  selectId?: Number;
  userId?: Number;
  selectTitle?: String;
  selectDesc?: String;
  option1?: String;
  option2?: String;
  option3?: String;
  option4?: String;
  option5?: String;
  endDate?: Number;
  selectViewCount?: Number;
}

export interface SelectModel extends Model<SelectAttributes>, SelectAttributes {}
export class Select extends Model<SelectModel, SelectAttributes> {}

export type SelectStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): SelectModel;
}

export function SelectFactory(sequelize: Sequelize): SelectStatic {
    return <SelectStatic>sequelize.define(
        'Select',
        {
            selectId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            selectTitle: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            selectDesc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            option1: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            option2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            option3: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            option4: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            option5: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            selectViewCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            modelName: "Select",
            tableName: "Selects",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
};