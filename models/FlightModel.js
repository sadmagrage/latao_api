const Mongoose = require("mongoose");
const { v4 } = require("uuid");

const { uuidToBin, binToUuid } = require("../utils/conversor");

const flightSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => uuidToBin(v4()),
        get: (bin) => binToUuid(bin)
    },
    price: {
        type: String,
        required: true
    },
    place: [{
        user_id: {
            type: Mongoose.Schema.Types.UUID,
            ref: 'user',
            required: true
        },
        user_places: [{
            type: String,
            required: true
        }]
    }],
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
    start_destination_id: {
        type: Mongoose.Schema.Types.UUID,
        ref: 'destination',
        required: true
    },
    final_destination_id: {
        type: Mongoose.Schema.Types.UUID,
        ref: 'destination',
        required: true
    }
});

const Flight = Mongoose.model('flight', flightSchema);

module.exports = Flight;