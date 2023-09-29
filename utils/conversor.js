const { stringify } = require("uuid");

const binToUuid = (bin) => {
    return stringify(Buffer.from(bin, 'hex'));
}

const uuidToBin = (uuid) => {
    return Buffer.from(uuid.replace(/-/g, ''), 'hex');
}

module.exports = { binToUuid, uuidToBin };