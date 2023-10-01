const Card = require("../models/CardModel");
const formatObject = require("../utils/formatObject");

const findAll = async () => {
    const cards = await Card.find();

    return formatObject(cards);
}

const findOne = async (userId) => {
    const card = await Card.findOne({ 'user_id': userId });

    return formatObject(card);
}

const save = async (cardDto) => {
    const card = new Card({
        security_number: cardDto.securityNumber,
        validity: cardDto.validity,
        property_number: cardDto.propertyNumber,
        property_name: cardDto.propertyName,
        user_id: cardDto.userId
    });

    await card.save();

    return formatObject(card);
}

module.exports = { findAll, findOne, save };