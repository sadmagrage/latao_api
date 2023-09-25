const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize")

const User = sequelize.define("user", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.STRING
    },
    passportNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trips: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    tripsId: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    cards: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    removed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;