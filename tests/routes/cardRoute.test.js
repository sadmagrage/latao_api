const request = require('supertest');
const app = require("../../app");
const cardController = require("../../controllers/cardController");

jest.mock("../../configs/mongoose", () => jest.fn());

jest.mock("../../controllers/cardController", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}));

const cardMock = {

};

describe("cardRoute", () => {

    test("findAll", async () => {

        cardController.findAll.mockImplementation(async (req, res) => {
            res.status(200).json([ cardMock ]);
        });

        const response = await request(app).get("/card", cardController.findAll);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([ cardMock ]);
    });

    test("findOne", async () => {

        let param = "";

        cardController.findOne.mockImplementation(async (req, res) => {

            console.log(req.params);
            param = req.params.userId;
            res.status(200).json(cardMock);
        });

        const response = await request(app).get("/card/userId", cardController.findOne);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(cardMock);
        expect(param).toBe("userId");
    });

    test("save", async () => {

        cardController.save.mockImplementation(async (req, res) => {
            res.status(201).json(cardMock);
        });

        const response = await request(app).post("/card", cardController.save).send(cardMock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(cardMock);
    });
});