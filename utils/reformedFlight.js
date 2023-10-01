const Destination = require("../models/DestinationModel");
const { uuidToBin } = require("./conversor");
const formatObject = require("./formatObject");

const reformedFlight = async (flightObj) => {
    const formatSingleFlight = async (flight) => {
        const reformedFlight = {};

        Object.keys(flight._doc).map(prop => {
            if (prop == "_id") {
                reformedFlight[prop] = formatObject(flight)[prop];
            }
            else {
                reformedFlight[prop] = flight[prop]
            }
        });
    
        reformedFlight["start_destination"] = formatObject(await Destination.findOne({ '_id': uuidToBin(flight.start_destination_id) }));
        reformedFlight["final_destination"] = formatObject(await Destination.findOne({ '_id': uuidToBin(flight.final_destination_id) }));
        
        return reformedFlight;
    }

    if (flightObj instanceof Array) {
        const flightPromises = flightObj.map(formatSingleFlight);

        return Promise.all(flightPromises);
    }
    else {
        return formatSingleFlight(flightObj);
    }
}

module.exports = reformedFlight;