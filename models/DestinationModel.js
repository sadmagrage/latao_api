const Mongoose = require("mongoose");
const { v4 } = require("uuid");

const { binToUuid, uuidToBin } = require("../utils/conversor");

const destinationSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => uuidToBin(v4()),
        get: (value) => binToUuid(value)
    },
    city_name: {
        type: String
    },
    zipcode: {
        type: String
    },
    city_tag: {
        type: String
    },
    country: {
        type: String
    }
});

const Destination = Mongoose.model("destination", destinationSchema);

module.exports = Destination;