const { v4 } = require("uuid");
const { uuidToBin, binToUuid } = require("../../utils/conversor");
const formatObject = require("../../utils/formatObject");

test('Transforma _id Buffer em UUID', () => {
    const uuid = v4();

    const modelObject = { _doc: { _id: uuidToBin(uuid) }, _id: uuidToBin(uuid) };
    //AINDA NAO ACABEI
    const modelArray = [];

    modelArray.push({ _doc: { _id: uuidToBin(v4()) } });
    modelArray.push({ _doc: { _id: uuidToBin(v4()) } });
    
    expect(formatObject(modelObject)._id).toBe(binToUuid(modelObject._doc._id));
});