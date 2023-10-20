const flightController = require("../../controllers/flightController");
const CustomError = require("../../errors/CustomError");
const flightService = require("../../services/flightService");

jest.mock("../../services/flightService", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
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

describe("flightController update", () => {

    test("update", async () => {

        const flightId = "flightId";

        const flight = {
            "_id": "_id",
            "price": "price",
            "place": "place",
            "flightNumber": "flight number",
            "airportTag": "airport tag",
            "company": "company",
            "bagageWeight": "bagage weight",
            "goingDate": "going date",
            "returnDate": "going date",
            "startDestinationId": "start destination id",
            "finalDestinationId": "final destination id"
        }

        flightService.update.mockResolvedValue(flight);

        const req = { body: flight, params: { "flightId": flightId } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await flightController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(flight);
        expect(flightService.update).toHaveBeenCalledWith(flight, flightId);
    });

    test("update CustomError", async () => {

        const flightId = "flightId";

        const flight = {
            "_id": "_id",
            "price": "price",
            "place": "place",
            "flightNumber": "flight number",
            "airportTag": "airport tag",
            "company": "company",
            "bagageWeight": "bagage weight",
            "goingDate": "going date",
            "returnDate": "going date",
            "startDestinationId": "start destination id",
            "finalDestinationId": "final destination id"
        }

        const errorMessage = "Mock rejected value";

        flightService.update.mockRejectedValue(new CustomError(errorMessage, 403));

        const req = { body: flight, params: { "flightId": flightId } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await flightController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(flightService.update).toHaveBeenCalledWith(flight, flightId);
    });

    test("update Error", async () => {

        const flightId = "flightId";

        const flight = {
            "_id": "_id",
            "price": "price",
            "place": "place",
            "flightNumber": "flight number",
            "airportTag": "airport tag",
            "company": "company",
            "bagageWeight": "bagage weight",
            "goingDate": "going date",
            "returnDate": "going date",
            "startDestinationId": "start destination id",
            "finalDestinationId": "final destination id"
        }

        const errorMessage = "Mock rejected value";

        flightService.update.mockRejectedValue(new Error(errorMessage));

        const req = { body: flight, params: { "flightId": flightId } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await flightController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(flightService.update).toHaveBeenCalledWith(flight, flightId);
    });
});

describe("flightController delete", () => {

    test("delete", async () => {

        const flightId = "flightId";

        const req = { body: {}, params: { "flightId": flightId } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        flightService.del.mockResolvedValue("Flight deleted sucessfully");

        await flightController.del(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Flight deleted sucessfully");
        expect(flightService.del).toHaveBeenCalledWith(flightId);
    });

    test("delete CustomError", async () => {

        const flightId = "flightId";

        const req = { body: {}, params: { "flightId": flightId } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const errorMessage = "Mock rejected value";

        flightService.del.mockRejectedValue(new CustomError(errorMessage, 403));

        await flightController.del(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(flightService.del).toHaveBeenCalledWith(flightId);
    });

    test("delete Error", async () => {

        const flightId = "flightId";

        const req = { body: {}, params: { "flightId": flightId } };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const errorMessage = "Mock rejected value";

        flightService.del.mockRejectedValue(new Error(errorMessage));

        await flightController.del(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(flightService.del).toHaveBeenCalledWith(flightId);
    });
});