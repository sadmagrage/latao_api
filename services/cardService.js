const Card = require("../models/CardModel");
const formatObject = require("../utils/formatObject");
const User = require("../models/UserModel")
const findAll = async () => {
    const cards = await Card.find();

    return formatObject(cards);
}

const findOne = async (userId) => {
    const card = await Card.findOne({ 'user_id': userId });

    return formatObject(card);
}

const save = async (cardDto) => {
    cardDto.userId = (await User.find())[0]._id;
    cardDto.validity = new Date();

    const card = await Card.create({
        security_number: cardDto.securityNumber,
        validity: cardDto.validity,
        property_name: cardDto.propertyName,
        user_id: cardDto.userId
    });

    return formatObject(card);
}

module.exports = { findAll, findOne, save };