const UserTripIds = require("../models/UserTripIds");

const findAll = async () => {
    const userTripIds = await UserTripIds.find();

    return formatObject(userTripIds);
};

const findOne = async (userTripIdsId) => {
    const userTripId = await UserTripIds.findOne(userTripIdsId);

    return formatObject(userTripId);
};

const save = async (userTripIdsDto) => {
    const userTripId = new UserTripIds({
        
    });

    await userTripId.save();

    return formatObject(userTripId);
};

module.exports = { findAll, findOne, save };