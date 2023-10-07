const { v4 } = require("uuid");
const formatObject = require("../../utils/formatObject");

test('Transforma _id Buffer em UUID', async () => {
    const destinationMock = {
        _id: v4(),
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
    };

    expect(formatObject(destinationMock)._id).toHaveLength(36);
    
    const destinationsMock = [ destinationMock, destinationMock ];
    
    const preparingMock = ( mock ) => {
        mock.map(item => {
            delete item._doc;
        });

        return mock;
    }
    
    expect(formatObject(destinationsMock)).toStrictEqual(preparingMock(destinationsMock));
});