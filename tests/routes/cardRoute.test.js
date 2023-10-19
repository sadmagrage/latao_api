const request = require('supertest');
const app = require("../../app");
const cardController = require("../../controllers/cardController");

jest.mock("../../configs/mongoose", () => jest.fn());

jest.mock("../../controllers/cardController", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
}));

const cardMock = {
    "securityNumber": "securityNumber",
    "validity": "validity",
    "propertyName": "propertyName",
    "userId": "userId"
};

describe("cardRoute", () => {

    test("findAll", async () => {
        let userId = "";

        cardController.findAll.mockImplementation(async (req, res) => {
            userId = req.params.userId;
            res.status(200).json([ cardMock ]);
        });

        const response = await request(app).get("/card/userId");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([ cardMock ]);
        expect(userId).toBe("userId");
    });

    test("findOne", async () => {

        let userId = "";
        let cardId = "";

        cardController.findOne.mockImplementation(async (req, res) => {
            userId = req.params.userId;
            cardId = req.params.cardId;

            res.status(200).json(cardMock);
        });

        const response = await request(app).get("/card/userId/cardId");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(cardMock);
        expect(userId).toBe("userId");
        expect(cardId).toBe("cardId");
    });

    test("save", async () => {
        let userId = "";

        cardController.save.mockImplementation(async (req, res) => {
            userId = req.params.userId;

            res.status(201).json(req.body);
        });

        const response = await request(app).post("/card/userId").send(cardMock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(cardMock);
        expect(userId).toBe("userId");
    });

    test("update", async () => {

        cardController.update.mockImplementation(async (req, res) => {
            userId = req.params.userId;
            cardId = req.params.cardId;

            res.status(200).json(req.body);
        });

        const response = await request(app).put("/card/userId/cardId").send(cardMock);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(cardMock);
        expect(userId).toBe("userId");
        expect(cardId).toBe("cardId");
    });

    test("delete", async () => {
        let userId = "";
        let cardId = "";

        cardController.del.mockImplementation(async (req, res) => {
            userId = req.params.userId;
            cardId = req.params.cardId;

            res.status(200).json("Card deleted sucessfully");
        });

        const response = await request(app).delete("/card/userId/cardId");

        expect(response.status).toBe(200);
        expect(response.body).toBe("Card deleted sucessfully");
        expect(userId).toBe("userId");
        expect(cardId).toBe("cardId");
    });
});