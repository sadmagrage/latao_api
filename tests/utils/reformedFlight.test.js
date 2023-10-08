const { v4 } = require("uuid");

const reformedFlight = require("../../utils/reformedFlight");
const Destination = require("../../models/DestinationModel");
const { uuidToBin } = require("../../utils/conversor");
const formatObject = require("../../utils/formatObject");

jest.mock("../../models/DestinationModel", () => ({
    findOne: jest.fn()
}));

jest.mock("../../utils/formatObject", () => jest.fn());

test("Deve trazer os Destinations para o Flight", async () => {

    const flightUUID = v4();
    const destinationUUID = v4();

    Destination.findOne.mockResolvedValue({
        _id: uuidToBin(destinationUUID),
        _doc: {
            _id: null,
            city_name: null,
            zipcode: null,
            city_tag: null,
            country: null
        },
        city_name: "teste",
        zipcode: "teste",
        city_tag: "teste",
        country: "teste"
    });

    formatObject.mockReturnValue({
        _id: destinationUUID,
        _doc: {
            _id: null,
            city_name: null,
            zipcode: null,
            city_tag: null,
            country: null
        },
        city_name: "teste",
        zipcode: "teste",
        city_tag: "teste",
        country: "teste"
    });

    const flightObj = {
        _id: uuidToBin(flightUUID),
        price: "teste",
        place: "teste",
        flight_number: 0,
        airport_tag: "teste",
        company: "teste",
        bagage_weight: "teste",
        going_date: new Date(),
        return_date: new Date(),
        start_destination_id: destinationUUID,
        final_destination_id: destinationUUID,
        _doc: { _id: null, price: null, place: null, flight_number: 0, airport_tag: null, company: null, bagage_weight: null, going_date: null, return_date: null, start_destination_id: null, final_destination_id: null }
    };

    const result = await reformedFlight(flightObj);

    expect(typeof result.start_destination).toBe('object');
    expect(typeof result.final_destination).toBe('object');
});