const request = require('supertest');
const app = require("../../app");
const userController = require("../../controllers/userController");

jest.mock("../../configs/mongoose", () => jest.fn());

jest.mock("../../controllers/userController", () => ({
    login: jest.fn(),
    register: jest.fn(),
    data: jest.fn()
}));

const userMock = {
    name: "name",
    password: "password",
    cpf: "cpf",
    age: "age",
    address: "address",
    number: "number",
    passportNumber: "passportNumber"
};

describe("userRoute", () => {

    test("login", async () => {

        let reqBody = {};

        userController.login.mockImplementation(async (req, res) => {
            reqBody = req.body;
            res.status(200).json({ "token": "token" });
        });

        const response = await request(app).post("/user/login").send(userMock);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ "token": "token" });
        expect(reqBody).toEqual(userMock);
    });

    test("register", async () => {

        let reqBody = {};

        userController.register.mockImplementation(async (req, res) => {
            reqBody = req.body;
            res.status(201).json({ "token": "token" });
        });

        const response = await request(app).post("/user/register").send(userMock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ "token": "token" });
        expect(reqBody).toEqual(userMock);
    });

    test("data", async () => {
        let tokenReceived = "";

        userController.data.mockImplementation(async (req, res) => {
            tokenReceived = req.header("Authorization");
            res.status(200).json(userMock);
        });

        const response = await request(app).get("/user/data").set('Authorization', "token");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(userMock);
        expect(tokenReceived).toBe("token");
    });
});