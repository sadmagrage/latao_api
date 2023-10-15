const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userService = require("../../services/userService");
const User = require("../../models/UserModel");
const CustomError = require("../../errors/CustomError");
const formatProperties = require("../../utils/formatProperties");
const formatObject = require("../../utils/formatObject");

jest.mock("../../models/UserModel", () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    hash: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
    verify: jest.fn()
}));

jest.mock("../../utils/formatProperties", () => ({
    snakeCaseToCamelCase: jest.fn(),
    camelCaseToSnakeCase: jest.fn()
}));

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../configs/mongoose", () => jest.fn());

describe("userService", () => {

    const userSnakeCase = {
        name: "",
        password: "",
        cpf: "",
        age: "",
        address: "",
        number: "",
        passport_number: ""
    }

    const userCamelCase = {
        name: "",
        password: "",
        cpf: "",
        age: "",
        address: "",
        number: "",
        passportNumber: ""
    }

    test("login", async () => {

        User.findOne.mockResolvedValue(userSnakeCase);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("token");

        const token = await userService.login(userSnakeCase);

        expect(User.findOne).toHaveBeenCalledWith({ 'cpf': userSnakeCase.cpf });
        expect(bcrypt.compare).toHaveBeenCalledWith(userSnakeCase.password, userSnakeCase.password);
        expect(jwt.sign).toHaveBeenCalledWith({ cpf: userSnakeCase.cpf }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        expect(token).toEqual({ 'token': 'token' });
    });

    test("login error", async () => {

        User.findOne.mockResolvedValue(userSnakeCase);
        bcrypt.compare.mockResolvedValue(false);

        try {
            await userService.login(userCamelCase);
            fail("Expected to throw CustomError");
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe("Wrong credentials");
            expect(error.status).toBe(401);
            expect(User.findOne).toHaveBeenCalledWith({ 'cpf': userSnakeCase.cpf });
            expect(bcrypt.compare).toHaveBeenCalledWith(userSnakeCase.password, userSnakeCase.password);
        }
    });

    test("register", async () => {

        User.findOne.mockResolvedValue(null);
        formatProperties.camelCaseToSnakeCase.mockReturnValue(userSnakeCase);
        bcrypt.hash.mockResolvedValue("hashed_pass");
        User.create.mockResolvedValue(userSnakeCase);
        jwt.sign.mockReturnValue("token");

        const token = await userService.register(userCamelCase);

        expect(User.findOne).toHaveBeenCalledWith({ 'cpf': userCamelCase.cpf });
        expect(formatProperties.camelCaseToSnakeCase).toHaveBeenCalledWith(userCamelCase);
        expect(bcrypt.hash).toHaveBeenCalledWith(userSnakeCase.password, 12);
        expect(User.create).toHaveBeenCalledWith({ ...userSnakeCase, password: await bcrypt.hash(userSnakeCase, 12) });
        expect(jwt.sign).toHaveBeenCalledWith({ cpf: userSnakeCase.cpf }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        expect(token).toEqual({ 'token': 'token' });
    });

    test("register error", async () => {

        User.findOne.mockResolvedValue(userCamelCase);
        
        try {
            await userService.register(userCamelCase);
            fail("Expected to throw CustomError");
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe("CPF already registered");
            expect(error.status).toBe(409);
        }
    });

    test("data", async () => {

        jwt.verify.mockResolvedValue(userCamelCase.cpf);
        User.findOne.mockResolvedValue(userSnakeCase);
        formatObject.mockReturnValue(userSnakeCase);
        formatProperties.snakeCaseToCamelCase.mockReturnValue(userCamelCase);

        const userWithoutPassword = {};
        
        Object.keys(userCamelCase).map(prop => {
            if (prop != 'password') userWithoutPassword[prop] = userCamelCase[prop];
        });

        const response = await userService.data("token");

        expect(jwt.verify).toHaveBeenCalledWith("token", process.env.PRIVATE_KEY, expect.any(Function));
        expect(User.findOne).toHaveBeenLastCalledWith({ 'cpf': userCamelCase.cpf });
        expect(formatObject).toHaveBeenCalledWith(userSnakeCase);
        expect(response).toEqual(userWithoutPassword);
        expect(response.password).not.toBeDefined();
    });

    test("data error", async () => {

        jwt.verify.mockRejectedValue(new CustomError("Mock rejected value", 401));

        try {
            await userService.data("token");
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe("Mock rejected value");
            expect(error.status).toBe(401);

        }
    });
});