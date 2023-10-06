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
    
    expect(formatObject(destinationsMock)).toStrictEqual([{
        _id: destinationMock._id,
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
    },{
        _id: destinationMock._id,
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
    }]);
    //NAO FAÇO IDEIA DOQ TA DANDO ERRADO
});