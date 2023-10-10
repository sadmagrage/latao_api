require("dotenv").config();

const CustomError = require("../../errors/CustomError");
const userController = require("../../controllers/userController");
const userService = require("../../services/userService");

jest.mock("../../services/userService", () => ({
    login: jest.fn(),
    register: jest.fn(),
    data: jest.fn()
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