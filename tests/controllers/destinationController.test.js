const CustomError = require("../../errors/CustomError");
const destinationController = require("../../controllers/destinationController");
const destinationService = require("../../services/destinationService");

jest.mock("../../services/destinationService", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}));

describe("destionationController findAll", () => {

    test("findAll", async () => {

        destinationService.findAll.mockResolvedValue([{}]);

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(await destinationService.findAll());
    });

    test("findAll CustomError", async () => {

        const errorMessage = "Mock rejected value";

        destinationService.findAll.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("findAll Error", async () => {
        
        const errorMessage = "Mock rejected value";

        destinationService.findAll.mockRejectedValue(new Error(errorMessage));

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("destinationController findOne", () => {

    test("findOne", async () => {

        destinationService.findOne.mockResolvedValue({});

        const req = { params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(await destinationService.findOne(req.params.destinationId));
    });

    test("findOne CustomError", async () => {

        const errorMessage = "Mock rejected value";

        destinationService.findOne.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { params: { destinationId: "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("findOne Error", async () => {

        const errorMessage = "Mock rejected value";

        destinationService.findOne.mockRejectedValue(new Error(errorMessage));

        const req = { params: { destinationId: "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("destinationController save", () => {

    test("save", async () => {

        destinationService.save.mockResolvedValue({});

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(await destinationService.save(req.body));
    });

    test("save CustomError", async () => {

        const errorMessage = "Mock rejected value";

        destinationService.save.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("save Error", async () => {
        
        const errorMessage = "Mock rejected value";

        destinationService.save.mockRejectedValue(new Error(errorMessage));

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});