require("../configs/mongoose");
const CustomError = require("../errors/CustomError");
const Card = require("../models/CardModel");
const formatObject = require("../utils/formatObject");
const { uuidToBin } = require("../utils/conversor");
const formatProperties = require("../utils/formatProperties");

const findAll = async (userId) => {
    const cards = formatObject(await Card.find({ 'user_id': userId }));

    return cards.map(formatProperties.snakeCaseToCamelCase);
}

const findOne = async (userId, cardId) => {
    const card = formatObject(await Card.findOne({ 'user_id': userId, '_id': uuidToBin(cardId) }));

    if (!card) throw new CustomError("Card not exists", 404);

    return formatProperties.snakeCaseToCamelCase(card);
}

const save = async (cardDto, userId) => {
    cardDto.userId = userId;
    
    cardDto = formatProperties.camelCaseToSnakeCase(cardDto);

    const card = formatObject(await Card.create({ ...cardDto }));

    return formatProperties.snakeCaseToCamelCase(card);
}

const update = async (cardDto, userId, cardId) => {
    const cardExists = await Card.findOne({ 'user_id': userId, '_id': uuidToBin(cardId) });

    if (!cardExists) throw new CustomError("Card not exists", 404);
    
    cardDto.userId = userId;
    
    cardDto = formatProperties.camelCaseToSnakeCase(cardDto);
    
    const card = formatObject(await Card.findOneAndUpdate({ 'user_id': userId, '_id': uuidToBin(cardId) }, { ...cardDto }, { new: true }));

    return formatProperties.snakeCaseToCamelCase(card);
}

const del = async (userId, cardId) => {
    const cardExists = await Card.findOne({ 'user_id': userId, '_id': uuidToBin(cardId) });

    if (!cardExists) throw new CustomError("Card not exists", 404);

    await Card.findOneAndDelete({ 'user_id': userId, '_id': uuidToBin(cardId) });

    return "Card deleted sucessfully";
}

module.exports = { findAll, findOne, save, update, del };