const CustomError = require("../errors/CustomError");
const cardService = require("../services/cardService");

const findAll = async (req, res) => {
    try {
        const cards = await cardService.findAll();

        res.status(200).json(cards);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
}

const findOne = async (req, res) => {
    try {
        const { userId } = req.params;

        const card = await cardService.findOne(userId);

        res.status(200).json(card);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
}

const save = async (req, res) => {
    try {
        const card = await cardService.save(req.body);

        res.status(201).json(card);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return
        }
        res.status(500).json(error.message);
    }
}

module.exports = { findAll, findOne, save };