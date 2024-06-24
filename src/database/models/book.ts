import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../connection';

// Order of InferAttributes & InferCreationAttributes is important.
export class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare title: string;
    declare author: string;
    declare year: number;
    declare genre: string | null;
}

Book.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
        type: DataTypes.STRING,
        allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Book' // We need to choose the model name
    }
)

export default Book;