const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

require("../configs/mongoose");
const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");

const login = async (userDto) => {
    const user = await User.findOne({ 'cpf': userDto.cpf });

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
    const cpfExists = await User.findOne({ 'cpf': userDto.cpf });
    
    if (cpfExists) throw new CustomError("CPF already registered", 409);

    const getHash = await bcrypt.hash(userDto.password, 12);
    
    const user = new User({ 
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

    const user = await User.findOne({ 'cpf': cpf });
    
    return {
        user_id: user._id,
        name: user.name,
        cpf: user.cpf,
        age: user.age,
        address: user.address,
        number: user.number,
        passport_number: user.passport_number
    };
};

module.exports = { login, register, data};