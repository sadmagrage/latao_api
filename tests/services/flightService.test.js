const flightService = require("../../services/flightService");
const Flight = require("../../models/FlightModel");
const formatObject = require("../../models/formatObject");

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../utils/reformedFlight", () => jest.fn());

jest.mock("../../models/FlightModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
}));

describe("flightService", () => {

    test("findAll", async () => {

    });

    test("findOne", async () => {

    });

    test("save", async () => {

    });
});