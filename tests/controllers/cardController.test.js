const cardController = require("../../controllers/cardController");
const cardService = require("../../services/cardService");
const CustomError = require("../../errors/CustomError");

jest.mock("../../services/cardService", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
}));

describe("cardController findAll", () => {

    test("findAll", async () => {

        const cards = [{
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        }];

        cardService.findAll.mockResolvedValue(cards);

        const req = { params: { userId: "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(cards);
        expect(cardService.findAll).toHaveBeenCalledWith(req.params.userId);
    });

    test("findAll CustomError", async () => {

        const errorMessage = "Mock rejected value";

        cardService.findAll.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { params: { userId: "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.findAll).toHaveBeenCalledWith(req.params.userId);
    });

    test("findAll Error", async () => {

        const errorMessage = "Mock rejected value";

        cardService.findAll.mockRejectedValue(new Error(errorMessage));

        const req = { params: { userId: "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.findAll).toHaveBeenCalledWith(req.params.userId);
    });
});

describe("cardController findOne", () => {

    test("findOne", async () => {

        const card = {
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        };

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
        expect(cardService.findOne).toHaveBeenCalledWith(req.params.userId, req.params.cardId);
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
        expect(cardService.findOne).toHaveBeenCalledWith(req.params.userId, req.params.cardId);
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
        expect(cardService.findOne).toHaveBeenCalledWith(req.params.userId, req.params.cardId);
    });
});

describe("cardController save", () => {

    test("save", async () => {

        const card = {
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        };

        cardService.save.mockResolvedValue(card);

        const req = { body: {}, params: { "userId": "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(card);
        expect(cardService.save).toHaveBeenCalledWith(req.body, req.params.userId);
    });

    test("save CustomError", async () => {

        const errorMessage = "Mock rejected value";

        cardService.save.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: {}, params: { "userId": "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.save).toHaveBeenCalledWith(req.body, req.params.userId);
    });

    test("save Error", async () => {

        const errorMessage = "Mock rejected value";

        cardService.save.mockRejectedValue(new Error(errorMessage));

        const req = { body: {}, params: { "userId": "userId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toBeDefined();
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.save).toHaveBeenCalledWith(req.body, req.params.userId);
    });
});

describe("cardController update", () => {

    test("update", async () => {

        const card = {
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        };

        cardService.update.mockResolvedValue(card);

        const req = { body: card, params: { "userId": "userId", "cardId": "cardId" }};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.update(req, res);

        const { userId, cardId } = req.params;

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(card);
        expect(cardService.update).toHaveBeenCalledWith(req.body, userId, cardId);
    });

    test("update CustomError", async () => {

        const card = {
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        };

        const errorMessage = "Mock rejected value";

        cardService.update.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: {}, params: { "userId": "userId", "cardId": "cardId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.update(req, res);

        const { userId, cardId } = req.params;

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.update).toHaveBeenCalledWith(card, userId, cardId)
    });

    test("update Error", async () => {

        const card = {
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        };
        
        const errorMessage = "Mock rejected value";

        cardService.update.mockRejectedValue(new Error(errorMessage));

        const req = { body: {}, params: { "userId": "userId", "cardId": "cardId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.update(req, res);

        const { userId, cardId } = req.params;

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.update).toHaveBeenCalledWith(card, userId, cardId)
    });
});

describe("cardController delete", () => {

    test("delete", async () => {
        
        cardService.del.mockResolvedValue("Card deleted sucessfully");

        const req = { body: {}, params: { "userId": "userId", "cardId": "cardId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.del(req, res);

        const { userId, cardId } = req.params;

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Card deleted sucessfully");
        expect(cardService.del).toHaveBeenCalledWith(userId, cardId);
    });

    test("delete CustomError", async () => {

        const errorMessage = "Mock rejected value";

        cardService.del.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: {}, params: { "userId": "userId", "cardId": "cardId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.del(req, res);

        const { userId, cardId } = req.params;

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.del).toHaveBeenCalledWith(userId, cardId);
    });

    test("delete Error", async () => {

        const errorMessage = "Mock rejected value";

        cardService.del.mockRejectedValue(new Error(errorMessage));

        const req = { body: {}, params: { "userId": "userId", "cardId": "cardId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await cardController.del(req, res);

        const { userId, cardId } = req.params;

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(cardService.del).toHaveBeenCalledWith(userId, cardId);
    });
});