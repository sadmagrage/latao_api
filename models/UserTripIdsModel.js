const Mongoose = require("mongoose");
const { v4 } = require("uuid");

const { binToUuid, uuidToBin } = require("../utils/conversor");

const userTripIdsSchema = new Mongoose.Schema({
    user_id: {
        type: Mongoose.Schema.Types.UUID,
        ref: "user"
    }/* ,
    trip_id: {

    } */
});

const UserTripIds = Mongoose.model(userTripIdsSchema);

module.exports = UserTripIds;