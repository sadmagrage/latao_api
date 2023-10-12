require("../configs/mongoose");
const Flight = require("../models/FlightModel");
const { uuidToBin } = require("../utils/conversor");
const reformedFlight = require("../utils/reformedFlight");
const CustomError = require("../errors/CustomError");

const findAll = async () => {
    const flights = await Flight.find();
    
    return await reformedFlight(flights);
};

const findOne = async (flightId) => {
    const flight = await Flight.findOne({ _id: uuidToBin(flightId) });

    if (!flight) throw new CustomError("Flight not found.", 404);

    return await reformedFlight(flight);
};

const save = async (flightDto) => {

    flightDto.goingDate = new Date();
    flightDto.returnDate = new Date();

    const flight = await Flight.create({
        price: flightDto.price,
        place: flightDto.place,
        flight_number: flightDto.flightNumber,
        airport_tag: flightDto.airportTag,
        company: flightDto.company,
        bagage_weight: flightDto.bagageWeight,
        going_date: flightDto.goindDate,
        return_date: flightDto.returnDate,
        start_destination_id: flightDto.startDestinationId,
        final_destination_id: flightDto.finalDestinationId
    });
    //ARRUMANDO OS JSON PARA CAMELCASE
    //USANDO .CREATE AGR
    return await reformedFlight(flight);
};

module.exports = { findAll, findOne, save };