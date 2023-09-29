const CustomError = require("../errors/CustomError");
const flightService = require("../services/flightService");

const findAll = async (req, res) => {
    try {
        const flights = await flightService.findAll();

        res.status(200).json(flights);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
};

const findOne = async (req, res) => {
    try {
        const { flightId } = req.body;

        const flight = await flightService.findOne(flightId);

        res.status(200).json(flight);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
};

const save = async (req, res) => {
    try {
        await flightService.save(req.body);

        res.status(201).json(flight);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
};

module.exports = { findAll, findOne, save };