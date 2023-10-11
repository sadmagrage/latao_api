const cardService = require("../../services/cardService");
const Card = require("../../models/CardModel");
const formatObject = require("../../utils/formatObject");

jest.mock("../../utils/formatObject", () => jest.fn());

jest.mock("../../models/CardModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    constructor: jest.fn()
}));

describe("cardService", () => {
    
    test("cardService findAll", async () => {
        
        Card.find.mockResolvedValue([{}]);

        const cards = await Card.find();

        formatObject.mockReturnValue(cards);

        await cardService.findAll();

        expect(Card.find).toHaveBeenCalled();
        expect(formatObject).toHaveBeenCalledWith(cards);
    });

    test("cardService findOne", async () => {

        Card.findOne.mockResolvedValue({});

        const cardId = "id";
        const card = await Card.findOne(cardId);

        formatObject.mockReturnValue(card);

        await cardService.findOne(cardId);

        expect(Card.findOne).toHaveBeenCalledWith(cardId);
        expect(formatObject).toHaveBeenCalledWith(card);
    });

    test("cardService save", async () => {

        Card.save.mockResolvedValue({});
        Card.constructor.mockReturnValue({});

        const cardDto = {
            security_number: "teste",
            validity: "teste",
            property_number: "teste",
            property_name: "teste",
            user_id: "teste"
        };

        await cardService.save(cardDto);

        expect(Card.save).toHaveBeenCalled();
    });
});


/* const { v4 } = require("uuid");

const { findAll } = require("../../services/cardService");
const Card = require("../../models/CardModel");

jest.mock("../../models/CardModel", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
}));

describe("Card service", () => {

    it("findAll", async () => {
        const userId = v4();

        Card.find.mockResolvedValue([{
            _id: v4(),
            security_number: 0,
            validity: new Date(),
            property_number: "teste",
            property_name: "teste",
            user_id: userId,
            _doc: {
                _id: null,
                security_number: null,
                validity: null,
                property_number: null,
                property_name: null,
                user_id: null
            }
        }]);

        const cards = await findAll();

        expect(Card.find).toHaveBeenCalled();
        expect(cards).toBeInstanceOf(Array);
        
        let isNull = false;

        Object.keys(cards[0]).map(prop => {
            if (cards[0][prop] == null) isNull = true;
        });

        expect(isNull).toBe(false);
    });
    
    it("findOne", async () => {
        const userId = v4();

        Card.findOne.mockResolvedValue({
            _id: v4(),
            security_number: 0,
            validity: new Date(),
            property_number: "teste",
            property_name: "teste",
            user_id: userId,
            _doc: {
                _id: null,
                security_number: null,
                validity: null,
                property_number: null,
                property_name: null,
                user_id: null
            }
        });

        Card.findOne.mockResolvedValue({
            _id: v4(),
            security_number: 0,
            validity: new Date(),
            property_number: "teste",
            property_name: "teste",
            user_id: userId
        });

        const card = await Card.findOne();

        expect(Card.findOne).toHaveBeenCalled();
        expect(typeof card).toBe("object");

        Object.keys(card).map(prop => {
            expect(card[prop]).toBeDefined();
        });
    });
    
    it("save", async () => {
        const userId = v4();

        Card.save.mockResolvedValue({
            _id: v4(),
            security_number: 0,
            validity: new Date(),
            property_number: "teste",
            property_name: "teste",
            user_id: userId,
            _doc: {
                _id: null,
                security_number: null,
                validity: null,
                property_number: null,
                property_name: null,
                user_id: null
            }
        });
    });
}); */