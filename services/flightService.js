require("../configs/mongoose");
const Flight = require("../models/FlightModel");
const { uuidToBin } = require("../utils/conversor");
const reformedFlight = require("../utils/reformedFlight");
const CustomError = require("../errors/CustomError");
const formatProperties = require("../utils/formatProperties");

const findAll = async () => {

    const flights = await Flight.find();

    const reformedFlightObj = await reformedFlight(flights);
    
    return reformedFlightObj.map(formatProperties.snakeCaseToCamelCase);
};

const findOne = async (flightId) => {

    const flight = await Flight.findOne({ _id: uuidToBin(flightId) });

    if (!flight) throw new CustomError("Flight not found.", 404);

    const reformedFlightObj = await reformedFlight(flight);

    return formatProperties.snakeCaseToCamelCase(reformedFlightObj);
};

const save = async (flightDto) => {

    flightDto = formatProperties.camelCaseToSnakeCase(flightDto);

    const flight = await Flight.create({ ...flightDto });
    
    const reformedFlightObj = await reformedFlight(flight);

    return formatProperties.snakeCaseToCamelCase(reformedFlightObj);
};

const update = async (flightDto, flightId) => {

    const flightExists = await Flight.findOne({ "_id": uuidToBin(flightId) });

    if (!flightExists) throw new CustomError("Flight not found.", 404);

    flightDto = formatProperties.camelCaseToSnakeCase(flightDto);

    const flight = await Flight.findOneAndUpdate({ "_id": uuidToBin(flightId) }, { ...flightDto }, { new: true });

    const reformedFlightObj = await reformedFlight(flight);

    return formatProperties.snakeCaseToCamelCase(reformedFlightObj);
};

const del = async (flightId) => {

    const flightExists = await Flight.findOne({ "_id": uuidToBin(flightId) });

    if (!flightExists) throw new CustomError("Flight not found.", 404);

    await Flight.findOneAndDelete({ "_id": uuidToBin(flightId) });

    return "Flight deleted sucessfully.";
};

module.exports = { findAll, findOne, save, update, del };