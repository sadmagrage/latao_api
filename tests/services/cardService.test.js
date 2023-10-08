const { v4 } = require("uuid");

const { findAll } = require("../../services/cardService");
const Card = require("../../models/CardModel");

jest.mock("../../models/CardModel", () => ({
    find: jest.fn()
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

        let allIdIsUUID = false;

        const data = (await findAll())[0];

        expect(Card.find).toHaveBeenCalled();
        expect(data._id).toHaveLength(36);
        expect(data._id).not.toBeInstanceOf(Buffer);
    });
    
    /* it("findOne", () => {
        
    });

    it("save", () => {
        
    }); */
});