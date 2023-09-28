const Mongoose = require("mongoose");
const uuid = require("uuid");

const userSchema = new Mongoose.Schema({
    _id: {
        type: Buffer,
        default: () => {
            const generatedUUID = uuid.v4().replace(/-/g, '');
            return Buffer.from(generatedUUID, 'hex');
        },
        get: (value) => {
            const id = Buffer.from(value, 'hex');
            return uuid.stringify(id);
        }
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
    passportNumber: {
        type: String
    }
});

const User = Mongoose.model("user", userSchema);

module.exports = User;