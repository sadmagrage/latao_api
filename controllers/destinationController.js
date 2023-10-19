const destinationService = require("../services/destinationService");
const CustomError = require("../errors/CustomError");

const findAll = async (req, res) => {
    try {
        const destinations = await destinationService.findAll();

        res.status(200).json(destinations);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const findOne = async (req, res) => {
    try {
        const { destinationId } = req.params;

        const destination = await destinationService.findOne(destinationId);

        res.status(200).json(destination);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const save = async (req, res) => {
    try {
        const destination = await destinationService.save(req.body);

        res.status(201).json(destination);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

const update = async (req, res) => {
    try {
        const { destinationId } = req.params;

        const destination = await destinationService.update(req.body, destinationId);

        res.status(200).json(destination);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
};

const del = async (req, res) => {
    try {
        const { destinationId } = req.params;

        await destinationService.del(destinationId);
        
        res.status(200).json("Destination deleted sucessfully");
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
};

module.exports = { findAll, findOne, save, update, del };