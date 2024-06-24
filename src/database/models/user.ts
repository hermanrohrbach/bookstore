import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, BelongsToManyAddAssociationsMixin } from 'sequelize';
import sequelize from '../connection';
import { Book } from './book';

// Order of InferAttributes & InferCreationAttributes is important.
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare token: string | null;
    declare dateLoggedIn: string | null;

    declare addBook: BelongsToManyAddAssociationsMixin<Book, number>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING
        },
        dateLoggedIn: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: 'User'
    },
);

export default User;