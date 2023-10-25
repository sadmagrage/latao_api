const Mongoose = require("mongoose");
const { v4 } = require("uuid");

const { uuidToBin, binToUuid } = require("../utils/conversor");

const userSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => uuidToBin(v4()),
        get: (bin) => binToUuid(bin)
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    number: {
        type: String
    },
    passport_number: {
        type: String
    },
    flights_id: [{
        type: Mongoose.Schema.Types.UUID,
        ref: "flight"
    }]
});

const User = Mongoose.model("user", userSchema);

module.exports = User;