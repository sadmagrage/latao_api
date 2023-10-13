const cardService = require("../../services/cardService");
const Card = require("../../models/CardModel");
const formatObject = require("../../utils/formatObject");

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../models/CardModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
}));

describe("cardService", () => {

    const cardCamelCase = {
        "_id": "",
        "securityNumber": "",
        "validity": "",
        "propertyName": "",
        "userId": ""
    };

    const cardSnakeCase = {
        "_id": "",
        "security_number": "",
        "validity": "",
        "property_name": "",
        "user_id": ""
    }
    
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

        Card.create.mockResolvedValue(cardCamelCase);

        const response = await cardService.save(cardSnakeCase);

        expect(Card.create).toHaveBeenCalledWith(cardSnakeCase);
        expect(response).toStrictEqual(cardCamelCase);
    });
});