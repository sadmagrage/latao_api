//require("../configs/mongoose");
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

module.exports = { findAll, findOne, save };