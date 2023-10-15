require("../configs/mongoose");
const Destination = require("../models/DestinationModel");
const formatObject = require("../utils/formatObject");
const formatProperties = require("../utils/formatProperties");
const { uuidToBin } = require("../utils/conversor");

const findAll = async () => {

    const destinations = formatObject(await Destination.find());

    return destinations.map(formatProperties.snakeCaseToCamelCase);
}

const findOne = async (destinationId) => {

    const destination = await Destination.findOne({ '_id': uuidToBin(destinationId) });

    if (!destination) throw new CustomError("Destination not found.", 404);

    const camelCaseDestination = formatProperties.snakeCaseToCamelCase(formatObject(destination));

    return camelCaseDestination;
}

const save = async (destinationDto) => {

    destinationDto = formatProperties.camelCaseToSnakeCase(destinationDto);

    const destination = await Destination.create({ ...destinationDto });

    const camelCaseDestination = formatProperties.snakeCaseToCamelCase(formatObject(destination));

    return camelCaseDestination;
};

module.exports = { findAll, findOne, save };