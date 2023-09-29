require("../configs/mongoose");
const Destination = require("../models/DestinationModel");
const Flight = require("../models/FlightModel");
const { uuidToBin, binToUuid } = require("../utils/conversor");
const formatObject = require("../utils/formatObject");

const findAll = async () => {
    const flights = await Flight.find();

    return formatObject(flights);
};

const findOne = async (flightId) => {
    const flightIdBin = uuidToBin(flightId);

    const flight = await Flight.findOne({ _id: flightIdBin });

    flight.start_destination = await Destination.findOne({ '_id': uuidToBin(start_destination) });
    flight.final_destination = await Destination.findOne({ '_id': uuidToBin(final_destination) });

    return formatObject(flight);
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
        start_destination: uuidToBin(flightDto.start_destination),
        final_destination: uuidToBin(flightDto.final_destination)
    });

    await flight.save();

    flight.start_destination = formatObject(await Destination.findOne({ '_id': uuidToBin(flight.start_destination) }));
    flight.final_destination = formatObject(await Destination.findOne({ '_id': uuidToBin(flight.final_destination) }));

    //flight.start_destination._id = binToUuid(flight.start_destination._id);

    return formatObject(flight);
};

module.exports = { findAll, findOne, save };