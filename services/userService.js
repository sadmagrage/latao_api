const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

require("../configs/mongoose");
const User = require("../models/UserModel");
const CustomError = require("../errors/CustomError");
const formatProperties = require("../utils/formatProperties");
const formatObject = require("../utils/formatObject");

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

    userDto = formatProperties.camelCaseToSnakeCase(userDto);

    const getHash = await bcrypt.hash(userDto.password, 12);
    
    const user = await User.create({ ...userDto, password: getHash });

    const token = jwt.sign({ cpf: user.cpf }, process.env.PRIVATE_KEY, { expiresIn: "1h" });

    return { "token": token };
};

const data = async (token) => {
    const cpf = await jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);

        return decoded.cpf;
    });

    let user = formatObject(await User.findOne({ 'cpf': cpf }));

    user = formatProperties.snakeCaseToCamelCase(user);

    delete user.password;

    return user;
};

const update = async (userDto, token) => {
    const cpf = await jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);

        return decoded.cpf;
    });

    const userExists = await User.findOne({ 'cpf': cpf });

    if (!userExists) throw new CustomError("User not found", 404);

    const getHash = await bcrypt.hash(userDto.password, 12);

    userDto.password = getHash;

    userDto = formatProperties.camelCaseToSnakeCase(userDto);

    const user = formatObject(await User.findOneAndUpdate({ 'cpf': cpf }, { ...userDto }, { new: true }));

    const userCamelCase = formatProperties.snakeCaseToCamelCase(user);

    return userCamelCase;
};

const del = async (token) => {
    const cpf = await jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401);

        return decoded.cpf;
    });

    const user = await User.findOne({ 'cpf': cpf });

    if (!user) throw new CustomError("User not found", 404);

    await User.findOneAndDelete({ 'cpf': user.cpf });

    return "User deleted sucessfully";
};

module.exports = { login, register, data, update, del };