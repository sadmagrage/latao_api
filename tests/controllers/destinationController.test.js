const CustomError = require("../../errors/CustomError");
const destinationController = require("../../controllers/destinationController");
const destinationService = require("../../services/destinationService");
const Destination = require("../../models/DestinationModel");

jest.mock("../../services/destinationService", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
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

describe("destinationController update", () => {

    test("update", async () => {

        const destinationMock = {};

        destinationService.update.mockResolvedValue(destinationMock);

        const req = { body: destinationMock, params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(destinationMock);
        expect(destinationService.update).toHaveBeenCalledWith(req.body, "destinationId");
    });

    test("update CustomError", async () => {

        const errorMessage = "Mock rejected value";

        const destinationMock = {};

        destinationService.update.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: destinationMock, params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(destinationService.update).toHaveBeenCalledWith(req.body, "destinationId");
    });

    test("update Error", async () => {

        const errorMessage = "Mock rejected value";

        const destinationMock = {};

        destinationService.update.mockRejectedValue(new Error(errorMessage));

        const req = { body: destinationMock, params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(destinationService.update).toHaveBeenCalledWith(req.body, "destinationId");
    });
});

describe("destinationController delete", () => {

    test("delete", async () => {

        const destinationMock = {};

        destinationService.del.mockResolvedValue("Destination deleted sucessfully");

        const req = { body: destinationMock, params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.del(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Destination deleted sucessfully");
        expect(destinationService.del).toHaveBeenCalledWith("destinationId");
    });

    test("delete CustomError", async () => {

        const destinationMock = {};

        const errorMessage = "Mock rejected value";

        destinationService.del.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: destinationMock, params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.del(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(destinationService.del).toHaveBeenCalledWith("destinationId");
    });

    test("delete Error", async () => {

        const destinationMock = {};

        const errorMessage = "Mock rejected value";

        destinationService.del.mockRejectedValue(new Error(errorMessage));

        const req = { body: destinationMock, params: { "destinationId": "destinationId" } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await destinationController.del(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(destinationService.del).toHaveBeenCalledWith("destinationId");
    });
});