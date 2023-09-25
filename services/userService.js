const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");

const login = async (userDto) => {
    const user = await User.findOne({ where: { cpf: userDto.cpf } });

    if (!user) throw new CustomError("Wrong credentials", 401);

    const acess = await bcrypt.compare(userDto.password, user.password);

    if (acess) {
        const token = jwt.sign({ cpf: user.cpf }, process.env.PRIVATE_KEY, { expiresIn: "1h" });

        return { "token": token };
    }
    else {
        throw new CustomError("Wrong credentials", 401);
    }
};

const register = async (userDto) => {
    const cpfExists = await User.findOne({ where: { cpf: userDto.cpf } });

    if (cpfExists) throw new CustomError("CPF already registered", 409);

    const getHash = await bcrypt.hash(userDto.password, 12);
    
    const user = User.build({ 
        name: userDto.name, 
        password: getHash, 
        cpf: userDto.cpf, 
        age: userDto.age,
        address: userDto.address,
        number: userDto.number,
        passportNumber: userDto.passportNumber
    });

    await user.save();

    const token = jwt.sign({ cpf: user.cpf }, process.env.PRIVATE_KEY, { expiresIn: "1h" });

    return { "token": token };
};

const data = async (token) => {
    const cpf = await jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);

        return decoded.cpf;
    });

    const user = await User.findOne({ where: { cpf: cpf }, attributes: ["name", "cpf", "age", "address", "number", "passportNumber", "trips", "tripsId", "cards", "active", "removed"] });

    user.trips = JSON.parse(user.trips);
    user.tripsId = JSON.parse(user.tripsId);
    user.cards = JSON.parse(user.cards);

    return user;
};

module.exports = { login, register, data};