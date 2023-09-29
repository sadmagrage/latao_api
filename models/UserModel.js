const Mongoose = require("mongoose");
const uuid = require("uuid");
const { uuidToBin, binToUuid } = require("../utils/conversor");

const userSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => uuidToBin(uuid.v4()),
        get: (value) => binToUuid(value) //O ERRO TA NO USER MESMO
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
    }
});

const User = Mongoose.model("user", userSchema);

module.exports = User;