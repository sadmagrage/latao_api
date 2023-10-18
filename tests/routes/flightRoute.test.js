const request = require('supertest');
const app = require("../../app");
const flightController = require("../../controllers/flightController");

jest.mock("../../configs/mongoose", () => jest.fn());

jest.mock("../../controllers/flightController", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}))

const flightMock = {
    "price": "teste",
    "place": ["teste"],
    "flightNumber": 0,
    "airportTag": "teste",
    "company": "teste",
    "bagageWeight": "teste",
    "goingDate": "data",
    "returnDate": "data"
}

describe("flightRoute", () => {
    
    test("findAll", async () => {

        flightController.findAll.mockImplementation(async (req, res) => {
            res.status(200).json([ flightMock ]);
        });

        const response = await request(app).get("/flight", flightController.findAll);
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([ flightMock ]);
    });
    
    test("findOne", async () => {

        let param = "";

        flightController.findOne.mockImplementation(async (req, res) => {
            param = req.params.flightId;
            res.status(200).json(flightMock);
        });

        const response = await request(app).get("/flight/flightId", flightController.findOne);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(flightMock);
        expect(param).toBe("flightId");
    });

    test("save", async () => {

        flightController.save.mockImplementation(async (req, res) => {
            res.status(201).json(req.body);
        });

        const response = await request(app).post("/flight", flightController.save).send(flightMock);
        
        expect(response.status).toBe(201);
        expect(response.body).toEqual(flightMock);
    });
});