const Mongoose = require("mongoose");
const { uuidToBin, binToUuid } = require("../utils/conversor");

const flightSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => uuidToBin(uuid.v4()),
        get: (value) => binToUuid(value)
    },
    price: {
        type: String,
        required: true
    },
    place: {
        type: Array
    },
    flight_number: {
        type: Number
    },
    airport_tag: {
        type: String
    },
    company: {
        type: String,
        required: true
    },
    bagage_weight: {
        type: String
    },
    going_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    },
    start_destiny: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'destiny',
        required: true
    },
    final_destiny: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'destiny',
        required: true
    }
});

const Flight = Mongoose.model('flight', flightSchema);

module.exports = Flight;