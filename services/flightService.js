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
    const flight = new Flight({
        price: flightDto.price,
        place: flightDto.place,
        flight_number: flightDto.flight_number,
        airport_tag: flightDto.airport_tag,
        company: flightDto.company,
        bagage_weight: flightDto.bagage_weight,
        going_date: new Date(),//flightDto.goindDate,
        return_date: new Date(),//flightDto.returnDate,
        start_destination_id: flightDto.start_destination_id,
        final_destination_id: flightDto.final_destination_id
    });

    await flight.save();
    
    return await reformedFlight(flight);
};

module.exports = { findAll, findOne, save };