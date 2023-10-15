const destinationService = require("../../services/destinationService");
const Destination = require("../../models/DestinationModel");
const formatObject = require("../../utils/formatObject");
const { uuidToBin } = require("../../utils/conversor");
const formatProperties = require("../../utils/formatProperties");

jest.mock("../../models/DestinationModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../utils/conversor", () => ({
    uuidToBin: jest.fn()
}));

jest.mock("../../utils/formatProperties", () => ({
    snakeCaseToCamelCase: jest.fn(),
    camelCaseToSnakeCase: jest.fn()
}));

describe("destinationService", () => {

    const destinationCamelCase = {
        "_id": "",
        "cityName": "",
        "zipcode": "",
        "cityTag": "",
        "country": ""
    };

    const destinationSnakeCase = {
        "_id": "",
        "city_name": "",
        "zipcode": "",
        "city_tag": "",
        "country": ""
    };

    test("findAll", async () => {

        Destination.find.mockResolvedValue([ destinationSnakeCase ]);
        formatObject.mockReturnValue(await Destination.find());
        formatProperties.snakeCaseToCamelCase.mockReturnValue(destinationCamelCase);

        const response = await destinationService.findAll();

        expect(Destination.find).toHaveBeenCalled();
        expect(formatObject).toHaveBeenCalledWith([ destinationSnakeCase ]);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalled();
        expect(response).toEqual([ destinationCamelCase ]);
    });

    test("findOne", async () => {

        Destination.findOne.mockResolvedValue(destinationSnakeCase);
        formatObject.mockReturnValue(destinationSnakeCase);
        formatProperties.snakeCaseToCamelCase.mockReturnValue(destinationCamelCase);

        const destinationId = "destinationId";

        const response = await destinationService.findOne({ '_id': uuidToBin(destinationId) });

        expect(Destination.findOne).toHaveBeenCalled();
        expect(formatObject).toHaveBeenCalledWith(destinationSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(destinationSnakeCase);
        expect(response).toEqual(destinationCamelCase);
    });

    test("save", async () => {

        formatProperties.camelCaseToSnakeCase.mockReturnValue(destinationSnakeCase);
        Destination.create.mockResolvedValue(destinationSnakeCase);
        formatObject.mockReturnValue(destinationSnakeCase);
        formatProperties.snakeCaseToCamelCase.mockReturnValue(destinationCamelCase);

        const response = await destinationService.save(destinationCamelCase);

        expect(formatProperties.camelCaseToSnakeCase).toHaveBeenCalledWith(destinationCamelCase);
        expect(Destination.create).toHaveBeenCalledWith(destinationSnakeCase);
        expect(formatObject).toHaveBeenCalledWith(destinationSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(destinationSnakeCase);
        expect(response).toEqual(destinationCamelCase);
    });
});