const cardService = require("../../services/cardService");
const Card = require("../../models/CardModel");
const formatObject = require("../../utils/formatObject");
const formatProperties = require("../../utils/formatProperties");

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../models/CardModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
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

        const cardId = "id";
        const card = await Card.findOne(cardId);

        formatObject.mockReturnValue(card);

        await cardService.findOne(cardId);

        expect(Card.findOne).toHaveBeenCalledWith(cardId);
        expect(formatObject).toHaveBeenCalledWith(card);
    });

    test("cardService save", async () => {

        Card.create.mockResolvedValue(cardSnakeCase);

        const response = await cardService.save(cardCamelCase, "userId");

        expect(Card.create).toHaveBeenCalledWith({ ...formatProperties.camelCaseToSnakeCase(cardCamelCase) });
        expect(response).toStrictEqual(formatProperties.snakeCaseToCamelCase(cardSnakeCase));
    });

    test("cardService update", async () => {

        Card.findOneAndUpdate.mockResolvedValue(cardSnakeCase);

        const response = await cardService.update(cardCamelCase, "userId", "cardId");

        expect(Card.findOneAndUpdate).toHaveBeenCalledWith({ 'user_id': "userId", 'card_id': "cardId" }, { ...formatProperties.camelCaseToSnakeCase(cardCamelCase) }, { new: true });
        expect(response).toEqual(formatProperties.snakeCaseToCamelCase(cardSnakeCase));
    });

    test("cardService delete", async () => {

        const response = await cardService.del("userId", "cardId");

        expect(Card.findOneAndDelete).toHaveBeenCalledWith({ 'user_id': "userId", 'card_id': "cardId" });
        expect(response).toBe("Card deleted sucessfully");
    });
});