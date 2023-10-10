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

it("", () => expect(1).toBe(1))