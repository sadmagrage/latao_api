const { v4 } = require("uuid");

const cardService = require("../../services/cardService");
const Card = require("../../models/CardModel");
const formatObject = require("../../utils/formatObject");
const formatProperties = require("../../utils/formatProperties");
const { uuidToBin } = require("../../utils/conversor");

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../models/CardModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
}));

jest.mock("../../utils/formatProperties", () => ({
    snakeCaseToCamelCase: jest.fn(),
    camelCaseToSnakeCase: jest.fn()
}));

jest.mock("../../configs/mongoose", () => jest.fn());

describe("cardService", () => {

    let cardCamelCase = {
        "_id": "_id",
        "securityNumber": "securityNumber",
        "validity": "validity",
        "propertyName": "propertyName",
        "userId": "userId"
    };

    let cardSnakeCase = {
        "_id": "_id",
        "security_number": "security_number",
        "validity": "validity",
        "property_name": "property_name",
        "user_id": "user_id"
    }

    beforeEach(() => {
        cardCamelCase = {
            "_id": "_id",
            "securityNumber": "securityNumber",
            "validity": "validity",
            "propertyName": "propertyName",
            "userId": "userId"
        };

        cardSnakeCase = {
            "_id": "_id",
            "security_number": "security_number",
            "validity": "validity",
            "property_name": "property_name",
            "user_id": "user_id"
        }
    })
    
    test("cardService findAll", async () => {
        
        Card.find.mockResolvedValue([cardSnakeCase]);

        const cards = await Card.find();

        formatObject.mockReturnValue(cards);
        
        await cardService.findAll();

        expect(Card.find).toHaveBeenCalled();
        expect(formatObject).toHaveBeenCalledWith(cards);
    });

    test("cardService findOne", async () => {

        Card.findOne.mockResolvedValue(cardSnakeCase);

        const cardId = v4();
        const userId = v4();
        
        const card = await Card.findOne({ 'user_id': userId, '_id': uuidToBin(cardId) });

        formatObject.mockReturnValue(card);
        formatProperties.snakeCaseToCamelCase.mockReturnValue(card);

        await cardService.findOne(userId, cardId);

        expect(Card.findOne).toHaveBeenCalledWith({ 'user_id': userId, '_id': uuidToBin(cardId) });
        expect(formatObject).toHaveBeenCalledWith(card);
        expect(formatProperties.snakeCaseToCamelCase).toHaveBeenCalledWith(card);
    });

    test("cardService save", async () => {

        Card.create.mockResolvedValue(cardSnakeCase);

        const response = await cardService.save(cardCamelCase, "userId");

        expect(Card.create).toHaveBeenCalledWith({ ...formatProperties.camelCaseToSnakeCase(cardCamelCase) });
        expect(response).toStrictEqual(formatProperties.snakeCaseToCamelCase(cardSnakeCase));
    });

    test("cardService update", async () => {

        const cardId = "cardId";
        const userId = "userId";

        Card.findOneAndUpdate.mockResolvedValue(cardSnakeCase);
        formatObject.mockReturnValue(cardSnakeCase);

        const card = await cardService.update(cardCamelCase, userId, cardId);

        expect(Card.findOneAndUpdate).toHaveBeenCalledWith({ 'user_id': userId, '_id': uuidToBin("cardId") }, { ...formatProperties.camelCaseToSnakeCase(cardCamelCase) }, { new: true });
        expect(formatObject).toHaveBeenCalledWith(await Card.findOneAndUpdate({ 'user_id': userId, '_id': uuidToBin("cardId") }, { ...formatProperties.camelCaseToSnakeCase(cardCamelCase) }, { new: true }));
        expect(card).toEqual(formatProperties.snakeCaseToCamelCase(cardSnakeCase));
    });

    test("cardService delete", async () => {

        const userId = "userId";
        const cardId = "cardId";

        Card.findOne.mockResolvedValue(cardSnakeCase);
        Card.findOneAndDelete.mockImplementation(() => {});

        const response = await cardService.del(userId, cardId);

        expect(Card.findOne).toHaveBeenCalledWith({ 'user_id': userId, "_id": uuidToBin(cardId) });
        expect(Card.findOneAndDelete).toHaveBeenCalledWith({ 'user_id': userId, '_id': uuidToBin(cardId) });
        expect(response).toBe("Card deleted sucessfully");
    });
});