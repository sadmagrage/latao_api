const request = require('supertest');
const app = require("../../app");
const flightController = require("../../controllers/flightController");

jest.mock("../../configs/mongoose", () => jest.fn());

jest.mock("../../controllers/flightController", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    del: jest.fn()
}));

const flightMock = {
    "price": "price",
    "place": ["place"],
    "flightNumber": 0,
    "airportTag": "airportTag",
    "company": "company",
    "bagageWeight": "bagageWeight",
    "goingDate": "goingDate",
    "returnDate": "returnDate"
}

describe("flightRoute", () => {
    
    test("findAll", async () => {

        flightController.findAll.mockImplementation(async (req, res) => {
            res.status(200).json([ flightMock ]);
        });

        const response = await request(app).get("/flight");
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([ flightMock ]);
    });
    
    test("findOne", async () => {

        let param = "";

        flightController.findOne.mockImplementation(async (req, res) => {
            param = req.params.flightId;
            res.status(200).json(flightMock);
        });

        const response = await request(app).get("/flight/flightId");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(flightMock);
        expect(param).toBe("flightId");
    });

    test("save", async () => {

        flightController.save.mockImplementation(async (req, res) => {
            res.status(201).json(req.body);
        });

        const response = await request(app).post("/flight").send(flightMock);
        
        expect(response.status).toBe(201);
        expect(response.body).toEqual(flightMock);
    });

    test("update", async () => {
        const flightId = "flightId";

        let param = "";

        flightController.del.mockImplementation(async (req, res) => {
            param = req.params.flightId;
            res.status(200).json(req.body);
        });

        const response = await request(app).put(`/flight/${ flightId }`).send(flightMock);

        expect(response.status).toBe(200);
        expect(response.json).toBe(req.body);
        expect(param).toBe(flightId);
    });

    test("delete", async () => {
        const flightId = "flightId";

        let param = "";

        flightController.del.mockImplementation(async (req, res) => {
            param = req.params.flightId;
            res.status(200).json("Flight deleted sucessfully");
        });

        const response = await request(app).delete(`/flight/${ flightId }`);

        expect(response.status).toBe(200);
        expect(response.json).toBe("Flight deleted sucessfully");
        expect(param).toBe(flightId);
    });
});