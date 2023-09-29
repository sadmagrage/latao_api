const { stringify } = require("uuid");

const binToUuid = (bin) => {
    /* const generatedUUID = bin.replace(/-/g, '');
    return Buffer.from(generatedUUID, 'hex'); */
    console.log(bin)
    return Buffer.from(bin.replace(/-/g, ''), 'hex');
}

const uuidToBin = (uuid) => {
    return stringify(Buffer.from(uuid, 'hex'));
}

module.exports = { binToUuid, uuidToBin };