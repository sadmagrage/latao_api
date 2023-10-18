const request = require("supertest");
const app = require("../../app");
const destinationController = require("../../controllers/destinationController");

jest.mock("../../configs/mongoose", () => jest.fn());

jest.mock("../../controllers/destinationController", () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}));

const destinationMock = {
    "cityName": "cityName",
    "zipcode": "zipcode",
    "cityTag": "cityTag",
    "country": "country"
};

describe("destinationRoute", () => {

    test("findAll", async () => {

        destinationController.findAll.mockImplementation(async (req, res) => {
            res.status(200).json([ destinationMock ]);
        });

        const response = await request(app).get("/destination");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([ destinationMock ]);
    });

    test("findOne", async () => {

        let destinationId = "";
        destinationController.findOne.mockImplementation(async (req, res) => {
            destinationId = req.params.destinationId;
            res.status(200).json(destinationMock);
        });

        const response = await request(app).get("/destination/destinationId");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(destinationMock);
        expect(destinationId).toBe("destinationId");
    });

    test("save", async () => {

        destinationController.save.mockImplementation(async (req, res) => {
            reqBody = destinationMock;
            res.status(201).json(req.body);
        });

        const response = await request(app).post("/destination").send(destinationMock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(destinationMock);
    });
});