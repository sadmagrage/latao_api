const Mongoose = require("mongoose");
const { v4 } = require("uuid");

const { binToUuid, uuidToBin } = require("../utils/conversor");

const cardSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => uuidToBin(v4()),
        get: (bin) => binToUuid(bin)
    },
    security_number: {
        type: Number,
        required: true
    },
    card_number: {
        type: Number,
        required: true
    },
    validity: {
        type: Date,
        required: true
    },
    property_name: {
        type: String,
        required: true
    },
    user_id: {
        type: Mongoose.Schema.Types.UUID,
        ref: 'user',
        required: true
    }
});

const Card = Mongoose.model('card', cardSchema);

module.exports = Card;