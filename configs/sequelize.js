const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    host: process.env.HOST_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    dialect: process.env.DIALECT_DB
});

module.exports = sequelize;