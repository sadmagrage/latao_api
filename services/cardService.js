require("../configs/mongoose");
const Card = require("../models/CardModel");
const formatObject = require("../utils/formatObject");
const formatProperties = require("../utils/formatProperties");

const findAll = async () => {
    const cards = formatObject(await Card.find());

    return cards.map(formatProperties.snakeCaseToCamelCase);
}

const findOne = async (userId) => {
    const card = formatObject(await Card.findOne({ 'user_id': userId }));

    return formatProperties.snakeCaseToCamelCase(card);
}

const save = async (cardDto) => {

    cardDto = formatProperties.camelCaseToSnakeCase(cardDto);

    const card = formatObject(await Card.create({ ...cardDto }));

    return formatProperties.snakeCaseToCamelCase(card);
}

module.exports = { findAll, findOne, save };