const { v4 } = require("uuid");

const { uuidToBin, binToUuid } = require("../../utils/conversor");

test('Deve converter UUID para buffer', () => {
    const newUuid = v4();

    const binToBeTested = uuidToBin(newUuid);
    const binToBeComparedTo = Buffer.from(newUuid.replace(/-/g, ''), 'hex');
    
    expect(binToBeTested.toString('hex')).toBe(binToBeComparedTo.toString('hex'));
});

test('Deve converter buffer para UUID', () => {
    const newUuid = v4();

    const bin = Buffer.from(newUuid.replace(/-/g, ''), "hex");
    
    expect(binToUuid(bin)).toBe(newUuid);
});