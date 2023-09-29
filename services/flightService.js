require("../configs/mongoose");
const Flight = require("../models/FlightModel");
const { uuidToBin } = require("../utils/conversor");

const findAll = async () => {
    const flights = await Flight.find();

    return flights;
};

const findOne = async (flightId) => {
    const flightIdBin = uuidToBin(flightId);

    const flight = await Flight.findOne({ _id: flightIdBin });

    return flight;
};

const save = async (flightDto) => {
    const flight = new Flight({
        price: flightDto.price,
        place: flightDto.place,
        flight_number: flightDto.flightNumber,
        airport_tag: flightDto.airportTag,
        company: flightDto.company,
        bagage_weight: flightDto.bagageWeight,
        going_date: flightDto.goindDate,
        return_date: flightDto.returnDate,
        start_destiny: flightDto.startDestiny,
        final_destiny: flightDto.returnDestiny
    });

    await flight.save();

    return flight;
};

module.exports = { findAll, findOne, save };