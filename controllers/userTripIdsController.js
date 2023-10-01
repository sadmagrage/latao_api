const CustomError = require("../errors/CustomError");
const userTripsIdsService = require("../services/userTripIdsService");

const findAll = async (req, res) => {
    try {
        const userTripIds = await userTripIdsService.findAll();

        return userTripIds;
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
        const { userTripIdsId }  = req.params;
        
        const userTripId = await userTripIdsService.findOne(userTripIdsId);

        return userTripId;
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
        const userTripId = await userTripIdsService.save(req.body);

        return userTripId;
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).json(error.message);
            return;
        }
        res.status(500).json(error.message);
    }
}

module.exports = { findAll, findOne, save };