const Destination = require("../models/DestinationModel");
const formatObject = require("../utils/formatObject");
const { uuidToBin } = require("../utils/conversor");

const findAll = async () => {
    const destinations = await Destination.find();

    return formatObject(destinations);
}

const findOne = async (destinationId) => {
    const destination = await Destination.findOne({ '_id': uuidToBin(destinationId) });

    if (!destination) throw new CustomError("Destination not found.", 404);

    return formatObject(destination);
}

const save = async (destinationDto) => {
    const destination = new Destination({
        city_name: destinationDto.cityName,
        zipcode: destinationDto.zipcode,
        city_tag: destinationDto.cityTag,
        country: destinationDto.country
    });

    await destination.save();

    return formatObject(destination);
};

module.exports = { findAll, findOne, save };