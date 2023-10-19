const destinationService = require("../../services/destinationService");
const Destination = require("../../models/DestinationModel");
const formatObject = require("../../utils/formatObject");
const { uuidToBin } = require("../../utils/conversor");
const formatProperties = require("../../utils/formatProperties");

jest.mock("../../models/DestinationModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
}));

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../utils/conversor", () => ({
    uuidToBin: jest.fn()
}));

jest.mock("../../utils/formatProperties", () => ({
    snakeCaseToCamelCase: jest.fn(),
    camelCaseToSnakeCase: jest.fn()
}));

jest.mock("../../configs/mongoose", () => jest.fn());

describe("destinationService", () => {

    const destinationCamelCase = {
        "_id": "_id",
        "cityName": "city name",
        "zipcode": "zipcode",
        "cityTag": "city tag",
        "country": "country"
    };

    const destinationSnakeCase = {
        "_id": "_id",
        "city_name": "city name",
        "zipcode": "zipcode",
        "city_tag": "city tag",
        "country": "country"
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

    test("update", async () => {

        Destination.findOne.mockResolvedValue(destinationSnakeCase);
        formatProperties.camelCaseToSnakeCase.mockReturnValue(destinationSnakeCase);
        Destination.findOneAndUpdate.mockResolvedValue(destinationSnakeCase);
        formatObject.mockReturnValue(destinationSnakeCase);
        formatProperties.snakeCaseToCamelCase(destinationCamelCase);

        const response = await destinationService.update(destinationCamelCase, "destinationId");

        expect(Destination.findOne).toHaveBeenCalledWith({ "_id": uuidToBin("destinationId") });
        expect(formatProperties.camelCaseToSnakeCase).toHaveBeenCalledWith(destinationCamelCase);
        expect(Destination.findOneAndUpdate).toHaveBeenCalledWith({ "_id": uuidToBin("destinationId") }, { ...destinationSnakeCase }, { new: true });
        expect(formatObject).toHaveBeenCalledWith(destinationSnakeCase);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(destinationSnakeCase);
        expect(response).toEqual(destinationCamelCase);
    });

    test("delete", async () => {

    });
});