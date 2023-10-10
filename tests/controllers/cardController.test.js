const cardController = require("../../controllers/cardController");
const cardService = require("../../services/cardService");
const CustomError = require("../../errors/CustomError");

jest.mock("../../services/cardService", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}));

describe("cardController findAll", () => {

    test("findAll", async () => {

        const cards = [{}];

        cardService.findAll.mockResolvedValue(cards);

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(cards);
    });

    test("findAll CustomError", async () => {

        const errorMessage = "Mock rejected value";

        cardService.findAll.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("findAll Error", async () => {

        const errorMessage = "Mock rejected value";

        cardService.findAll.mockRejectedValue(new Error(errorMessage));

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("cardController findOne", () => {

    test("findOne", async () => {

        const card = {};

        cardService.findOne.mockResolvedValue(card);

        const req = { params: { "userId": "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(card);
    });

    test("findOne CustomError", async () => {

        const errorMessage = "Mock rejected value";

        cardService.findOne.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { params: { "userId": "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("findOne Error", async () => {

        const errorMessage = "Mock rejected value";

        cardService.findOne.mockRejectedValue(new Error(errorMessage));

        const req = { params: { "userId": "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("cardController save", () => {

    test("save", async () => {

        const card = {}

        cardService.save.mockResolvedValue(card);

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(card);
    });

    test("save CustomError", async () => {

        const errorMessage = "Mock rejected value";

        cardService.save.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("save Error", async () => {

        const errorMessage = "Mock rejected value";

        cardService.save.mockRejectedValue(new Error(errorMessage));

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});