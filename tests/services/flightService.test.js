const flightService = require("../../services/flightService");
const Flight = require("../../models/FlightModel");
const reformedFlight = require("../../utils/reformedFlight");
const { uuidToBin } = require("../../utils/conversor");
const formatProperties = require("../../utils/formatProperties");

jest.mock("../../utils/reformedFlight", () => jest.fn());

jest.mock("../../models/FlightModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
}));

jest.mock("../../utils/formatProperties", () => ({
    camelCaseToSnakeCase: jest.fn(),
    snakeCaseToCamelCase: jest.fn()
}));

jest.mock("../../configs/mongoose", () => jest.fn());

describe("flightService", () => {

    const flightCamelCase = {
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
    };

    const flightSnakeCase = {
        "_id": "_id",
        "price": "price",
        "place": "place",
        "flight_number": "flight number",
        "airport_tag": "airport tag",
        "company": "company",
        "bagage_weight": "bagage weight",
        "going_date": "going date",
        "return_date": "return date",
        "start_destination_id": "start destination id",
        "final_destination_id": "final destination id"
    };

    const afterReformedFlightSnakeCase = {
        "_id": "_id",
        "price": "price",
        "place": "place",
        "flight_number": "flight number",
        "airport_tag": "airport tag",
        "company": "company",
        "bagage_weight": "bagage weight",
        "going_date": "going date",
        "return_date": "return date",
        "start_destination_id": "start destination id",
        "final_destination_id": "final destination id",
        "start_destination": "start destination",
        "final_destination": "final destination"
    };

    const afterReformedFlightCamelCase = {
        "_id": "_id",
        "price": "price",
        "place": "place",
        "flightNumber": "flight number",
        "airportTag": "airport tag",
        "company": "company",
        "bagageWeight": "bagage weight",
        "goingDate": "going date",
        "returnDate": "return date",
        "startDestinationId": "start destination id",
        "finalDestinationId": "final destination id",
        "startDestination": "start destination",
        "finalDestination": "final destination"
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

    test("update", async () => {

        const flightId = "flightId";

        Flight.findOne.mockResolvedValue(flightSnakeCase);
        formatProperties.camelCaseToSnakeCase.mockReturnValue(flightSnakeCase);
        Flight.findOneAndUpdate.mockResolvedValue(flightSnakeCase);
        reformedFlight.mockResolvedValue(afterReformedFlightSnakeCase);
        formatProperties.snakeCaseToCamelCase.mockReturnValue(afterReformedFlightCamelCase);

        const response = await flightService.update(flightCamelCase, "flightId");

        expect(Flight.findOne).toHaveBeenCalledWith({ '_id': uuidToBin(flightId) });
        expect(formatProperties.camelCaseToSnakeCase).toHaveBeenCalledWith(flightCamelCase);
        expect(Flight.findOneAndUpdate).toHaveBeenCalledWith({ '_id': uuidToBin(flightId) }, { ...flightSnakeCase }, { new: true });
        expect(reformedFlight).toHaveBeenCalledWith(flightSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(afterReformedFlightCamelCase);
        expect(response).toEqual(afterReformedFlightCamelCase);
    });

    test("delete" , async () => {

        const flightId = "flightId";

        Flight.findOne.mockResolvedValue(flightSnakeCase);
        Flight.findOneAndDelete.mockImplementation(() => {});

        const message = await flightService.del(flightId);

        expect(Flight.findOne).toHaveBeenCalledWith({ '_id': uuidToBin(flightId) });
        expect(Flight.findOneAndDelete).toHaveBeenCalledWith({ '_id': uuidToBin(flightId) });
        expect(message).toBe("Flight deleted sucessfully.");
    });
});