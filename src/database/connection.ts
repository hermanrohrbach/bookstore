import { Sequelize } from 'sequelize-typescript';

// Change Sequelize dialect and parameters to use a different DB
// TODO: add a dbconfig.json file with the different options
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/database.sqlite'
});

export default sequelize;