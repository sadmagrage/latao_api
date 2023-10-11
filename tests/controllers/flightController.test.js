const flightController = require("../../controllers/flightController");
const CustomError = require("../../errors/CustomError");
const flightService = require("../../services/flightService");

jest.mock("../../services/flightService", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}));

describe("flightController findAll", () => {

    test("findAll", async () => {

        flightService.findAll.mockResolvedValue([{}]);

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(await flightService.findAll());
    });

    test("findAll CustomError", async () => {

        const errorMessage = "Mock rejected value";

        flightService.findAll.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("findAll Error", async () => {

        const errorMessage = "Mock rejected value";

        flightService.findAll.mockRejectedValue(new Error(errorMessage));

        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("flightController findOne", () => {

    test("findOne", async () => {

        flightService.findOne.mockResolvedValue({});

        const req = { params: { "flightId": "flightId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(await flightService.findOne(req.params.flightId));
    });

    test("findOne CustomError", async () => {

        const errorMessage = "Mock rejected value";

        flightService.findOne.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { params: { "flightId": "flightId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("findOne Error", async () => {

        const errorMessage = "Mock rejected value";

        flightService.findOne.mockRejectedValue(new Error(errorMessage));

        const req = { params: { 'flightId': 'flightId' } };
        
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.findOne(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});

describe("flighController save", () => {

    test("save", async () => {

        flightService.save.mockResolvedValue({});

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(await flightService.save(req.body));
    });

    test("save CustomError", async () => {

        const errorMessage = "Mock rejected value";

        flightService.save.mockRejectedValue(new CustomError(errorMessage, 403));
        
        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });

    test("save Error", async () => {

        const errorMessage = "Mock rejected value";

        flightService.save.mockRejectedValue(new Error(errorMessage));

        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await flightController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
});