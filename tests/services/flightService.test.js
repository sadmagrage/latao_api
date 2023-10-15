const flightService = require("../../services/flightService");
const Flight = require("../../models/FlightModel");
const reformedFlight = require("../../utils/reformedFlight");
const { uuidToBin } = require("../../utils/conversor");
const formatProperties = require("../../utils/formatProperties");

jest.mock("../../utils/reformedFlight", () => jest.fn());

jest.mock("../../models/FlightModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("../../utils/formatProperties", () => ({
    camelCaseToSnakeCase: jest.fn(),
    snakeCaseToCamelCase: jest.fn()
}));

jest.mock("../../configs/mongoose", () => jest.fn());

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
        formatProperties.snakeCaseToCamelCase.mockReturnValue( afterReformedFlightCamelCase );

        const response = await flightService.findAll();
        
        expect(Flight.find).toHaveBeenCalled();
        expect(reformedFlight).toHaveBeenCalledWith([ flightSnakeCase ]);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalled();
        expect(response).toEqual([ afterReformedFlightCamelCase ]);
    });

    test("findOne", async () => {

        Flight.findOne.mockResolvedValue(flightSnakeCase);
        reformedFlight.mockResolvedValue(afterReformedFlightSnakeCase);
        formatProperties.snakeCaseToCamelCase.mockReturnValue( afterReformedFlightCamelCase );

        const flightId = "flightId";

        const response = await flightService.findOne(flightId);

        expect(Flight.findOne).toHaveBeenCalledWith({ _id: uuidToBin(flightId) });
        expect(reformedFlight).toHaveBeenCalledWith(flightSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(afterReformedFlightSnakeCase);
        expect(response).toEqual(afterReformedFlightCamelCase);
    });

    test("save", async () => {

        formatProperties.camelCaseToSnakeCase.mockReturnValue(flightSnakeCase);
        Flight.create.mockResolvedValue(flightSnakeCase);
        reformedFlight.mockResolvedValue(afterReformedFlightSnakeCase);
        formatProperties.snakeCaseToCamelCase(afterReformedFlightCamelCase);

        const response = await flightService.save(flightCamelCase);

        expect(formatProperties.camelCaseToSnakeCase).toHaveBeenCalledWith(flightCamelCase);
        expect(Flight.create).toHaveBeenCalledWith({ ...flightSnakeCase });
        expect(reformedFlight).toHaveBeenCalledWith(flightSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(afterReformedFlightSnakeCase);
        expect(response).toEqual(afterReformedFlightCamelCase);
    });
});