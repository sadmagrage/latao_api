const flightService = require("../../services/flightService");
const Flight = require("../../models/FlightModel");
const formatObject = require("../../utils/formatObject");
const reformedFlight = require("../../utils/reformedFlight");

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../utils/reformedFlight", () => jest.fn());

jest.mock("../../models/FlightModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
}));

describe("flightService", () => {

    const flightCamelCase = {
        "_id": "",
        "price": "",
        "place": "",
        "flightNumber": "",
        "airportTag": "",
        "company": "",
        "bagageWeight": "",
        "goingDate": "",
        "returnDate": "",
        "startDestinationId": "",
        "finalDestinationId": ""
    };

    const flightSnakeCase = {
        "_id": "",
        "price": "",
        "place": "",
        "flight_number": "",
        "airport_tag": "",
        "company": "",
        "bagage_weight": "",
        "going_date": "",
        "return_date": "",
        "start_destination_id": "",
        "final_destination_id": ""
    };

    const afterReformedFlightSnakeCase = {
        "_id": "",
        "price": "",
        "place": "",
        "flight_number": "",
        "airport_tag": "",
        "company": "",
        "bagage_weight": "",
        "going_date": "",
        "return_date": "",
        "start_destination_id": "",
        "final_destination_id": "",
        "start_destination": "",
        "final_destination": ""
    };

    const afterReformedFlightCamelCase = {
        "_id": "",
        "price": "",
        "place": "",
        "flightNumber": "",
        "airportTag": "",
        "company": "",
        "bagageWeight": "",
        "goingDate": "",
        "returnDate": "",
        "startDestinationId": "",
        "finalDestinationId": "",
        "startDestination": "",
        "finalDestination": ""
    }


    test("findAll", async () => {
        
        Flight.find.mockResolvedValue([ flightSnakeCase ]);
        reformedFlight.mockResolvedValue([ afterReformedFlightSnakeCase ]);

        const response = await flightService.findAll();
        
        expect(Flight.find).toHaveBeenCalled();
        expect(reformedFlight).toHaveBeenCalledWith([ flightSnakeCase ]);
        expect(response).toEqual([ afterReformedFlightCamelCase ]);
    });

    /* test("findOne", async () => {

    });

    test("save", async () => {

    }); */
});