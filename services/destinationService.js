require("../configs/mongoose");
const Destination = require("../models/DestinationModel");
const formatObject = require("../utils/formatObject");
const formatProperties = require("../utils/formatProperties");
const { uuidToBin } = require("../utils/conversor");
const CustomError = require("../errors/CustomError");

const findAll = async () => {

    const destinations = formatObject(await Destination.find());

    return destinations.map(formatProperties.snakeCaseToCamelCase);
}

const findOne = async (destinationId) => {

    const destination = await Destination.findOne({ '_id': uuidToBin(destinationId) });

    if (!destination) throw new CustomError("Destination not found", 404);

    const camelCaseDestination = formatProperties.snakeCaseToCamelCase(formatObject(destination));

    return camelCaseDestination;
}

const save = async (destinationDto) => {

    destinationDto = formatProperties.camelCaseToSnakeCase(destinationDto);

    const destination = await Destination.create({ ...destinationDto });

    const camelCaseDestination = formatProperties.snakeCaseToCamelCase(formatObject(destination));

    return camelCaseDestination;
};

const update = async (destinationDto, destinationId) => {

    const destinationExists = await Destination.findOne({ 'destination_id': destinationId });

    if (!destinationExists) throw new CustomError("Destination not found", 404);

    destinationDto = formatProperties.camelCaseToSnakeCase(destinationDto);

    const destination = formatObject(await Destination.findOneAndUpdate({ 'destination_id': uuidToBin(destinationId) }, { ...destinationDto }, { new: true }));

    const camelCaseDestination = formatProperties.snakeCaseToCamelCase(destination);
    
    return camelCaseDestination;
};

const del = async (destinationId) => {

    const destinationExists = await Destination.findOne({ 'destination_id': destinationId });

    if (!destinationExists) throw new CustomError("Destination not found", 404);

    await Destination.findOneAndDelete({ 'destination_id': uuidToBin(destinationId) });

    return "Destination deleted sucessfully";
};

module.exports = { findAll, findOne, save, update, del };