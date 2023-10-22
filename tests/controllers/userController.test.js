require("dotenv").config();

const CustomError = require("../../errors/CustomError");
const userController = require("../../controllers/userController");
const userService = require("../../services/userService");

jest.mock("../../services/userService", () => ({
    login: jest.fn(),
    register: jest.fn(),
    data: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
}));

describe("userController login", () => {

    test("login", async () => {

        userService.login.mockResolvedValue({ "token": "token" })

        const req = { body: { login: "teste", password: "123" } };

        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(await userService.login());
    });

    test("login CustomError", async () => {

        const errorMessage = "Mock rejected value";

        userService.login.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: { login: "teste", password: "123" } };

        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("login Error", async () => {

        const errorMessage = "Mock rejected value";

        userService.login.mockRejectedValue(new Error(errorMessage));

        const req = { body: { login: "teste", password: "123" } };

        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    })
});

describe("userController register", () => {

    test("register", async () => {

        userService.register.mockResolvedValue({ "token": "token" });

        const req = { body: { login: "teste", password: "123" } };

        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

         await userController.register(req, res);

         expect(res.status).toHaveBeenCalledWith(201);
         expect(res.json).toHaveBeenCalledWith(await userService.register())
    });

    test("register CustomError", async () => {

        const errorMessage = "Mock rejected value";

        userService.register.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: { login: "teste", password: "123" } };

        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

         await userController.register(req, res);

         expect(res.status).toHaveBeenCalledWith(403);
         expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("register Error", async () => {

        const errorMessage = "Mock rejected value";

        userService.register.mockRejectedValue(new Error(errorMessage));

        const req = { body: { login: "teste", password: "123" } };

        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

         await userController.register(req, res);

         expect(res.status).toHaveBeenCalledWith(500);
         expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("userController data", () => {

    test("data", async () => {

        userService.data.mockResolvedValue({ "data": "data" });

        const req = { header: jest.fn() };
        
        const res = { 
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
         };

        await userController.data(req, res);

        expect(req.header).toHaveBeenCalledWith("Authorization");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(await userService.data(req, res));
    });

    test("data CustomError", async () => {

        const errorMessage = "Mock rejected value";

        userService.data.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await userController.data(req, res);

        expect(req.header).toHaveBeenCalledWith("Authorization");
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("data Error", async () => {
        
        const errorMessage = "Mock rejected value";

        userService.data.mockRejectedValue(new Error(errorMessage));

        const req = { header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.data(req, res);

        expect(req.header).toHaveBeenCalledWith("Authorization");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("userController update", () => {

    test("update", async () => {

        const userMock = {
            "_id": "_id",
            "name": "name",
            "password": "password",
            "cpf": "cpf",
            "age": "age",
            "address": "address",
            "number": "number",
            "passportNumber":"passportNumber"
        }

        userService.update.mockResolvedValue(userMock);

        const req = { body: userMock, header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userMock);
        expect(req.header).toHaveBeenCalledWith("Authorization");
    });

    test("update CustomError", async () => {

        const errorMessage = "Mock rejected value";

        const userMock = {
            "_id": "_id",
            "name": "name",
            "password": "password",
            "cpf": "cpf",
            "age": "age",
            "address": "address",
            "number": "number",
            "passportNumber":"passportNumber"
        }

        userService.update.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: userMock, header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        try {
            await userController.update(req, res);
        } catch (error) {
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith(errorMessage);
            expect(req.header).toHaveBeenCalledWith("Authorization");
        }
    });

    test("update Error", async () => {

        const errorMessage = "Mock rejected value";

        const userMock = {
            "_id": "_id",
            "name": "name",
            "password": "password",
            "cpf": "cpf",
            "age": "age",
            "address": "address",
            "number": "number",
            "passportNumber":"passportNumber"
        }

        userService.update.mockRejectedValue(new Error(errorMessage));

        const req = { body: userMock, header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        try {
            await userController.update(req, res);
        } catch (error) {
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith(errorMessage);
            expect(req.header).toHaveBeenCalledWith("Authorization");
        }
    });
});

describe("userController delete", () => {

    test("delete", async () => {

        const req = { header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        userService.del.mockResolvedValue("User deleted sucessfully.");

        await userController.del(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("User deleted sucessfully.");
        expect(req.header).toHaveBeenCalledWith("Authorization");
    });

    test("delete CustomError", async () => {

        const errorMessage = "Mock rejected value";

        const req = { header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        userService.del.mockRejectedValue(new CustomError(errorMessage, 403));

        await userController.del(req,res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(req.header).toHaveBeenCalledWith("Authorization");
    });

    test("delete Error", async () => {

        const errorMessage = "Mock rejected value";

        const req = { header: jest.fn() };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        userService.del.mockRejectedValue(new Error(errorMessage));

        await userController.del(req,res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(req.header).toHaveBeenCalledWith("Authorization");
    });
});