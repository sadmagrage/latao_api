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
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
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

const userSnakeCase = {
    name: "name",
    password: "password",
    cpf: "cpf",
    age: "age",
    address: "address",
    number: "number",
    passport_number: "passport number"
}

const userCamelCase = {
    name: "name",
    password: "password",
    cpf: "cpf",
    age: "age",
    address: "address",
    number: "number",
    passportNumber: "passport number"
}

describe("userService", () => {

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

describe("userService update", () => {

    test("update", async () => {
        const token = "token";

        jwt.verify.mockResolvedValue(userCamelCase.cpf);
        User.findOne.mockResolvedValue(userSnakeCase);
        bcrypt.hash.mockResolvedValue("hashed pass");
        formatProperties.camelCaseToSnakeCase.mockReturnValue(userSnakeCase);
        User.findOneAndUpdate.mockResolvedValue(userSnakeCase);
        formatObject.mockReturnValue(userSnakeCase);
        formatProperties.snakeCaseToCamelCase.mockReturnValue(userCamelCase);

        const response = await userService.update(userCamelCase, token);

        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.PRIVATE_KEY, expect.any(Function));
        expect(User.findOne).toHaveBeenCalledWith({ 'cpf': userCamelCase.cpf });
        expect(bcrypt.hash).toHaveBeenCalledWith(userSnakeCase.password, 12);
        expect(formatProperties.camelCaseToSnakeCase).toHaveBeenCalledWith(userCamelCase);
        expect(User.findOneAndUpdate).toHaveBeenCalledWith({ 'cpf': userSnakeCase.cpf }, { ...userSnakeCase }, { new: true });
        expect(formatObject).toHaveBeenCalledWith(userSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(userSnakeCase);
        expect(response).toEqual(userCamelCase);
    });

    test("update Error", async () => {

        const token = "token";

        const errorMessage = "Mock rejected value";

        jwt.verify.mockResolvedValue(userCamelCase.cpf);
        User.findOne.mockRejectedValue(new CustomError(errorMessage, 403));
        
        try {
            await userService.update(userCamelCase, token);    
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe("Mock rejected value");
            expect(error.status).toBe(403);
        }
    });
});

describe("userService delete", () => {

    test("delete", async () => {

        const token = "token";

        jwt.verify.mockResolvedValue(userCamelCase.cpf);
        User.findOne.mockResolvedValue(userSnakeCase);
        User.findOneAndDelete.mockImplementation(() => {});
        
        const message = await userService.del(token);
        
        expect(jwt.verify).toHaveBeenCalledWith(token, process.env.PRIVATE_KEY, expect.any(Function));
        expect(User.findOne).toHaveBeenCalledWith({ 'cpf': userCamelCase.cpf });
        expect(User.findOneAndDelete).toHaveBeenCalledWith({ 'cpf': userCamelCase.cpf });
        expect(message).toBe("User deleted sucessfully");
    });

    test("delete Error", async () => {

        const token = "token";

        const errorMessage = "Mock rejected value";

        jwt.verify.mockResolvedValue(userCamelCase.cpf);
        User.findOne.mockRejectedValue(new CustomError(errorMessage, 403));

        try {
            const message = await userService.del(token);
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe(errorMessage);
            expect(error.status).toBe(403);
        }
    });
});