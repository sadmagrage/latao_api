const Destination = require("../models/DestinationModel");
const { uuidToBin } = require("./conversor");
const formatObject = require("./formatObject");

const reformedFlight = async (flight) => {
    if (flight instanceof Array) {
        const arrFlight = [];
        
        flight.map(item => {
            const reformedFlight = {};

            Object.keys(item._doc).map(prop => {
                if (prop == "_id") {
                    reformedFlight[prop] = formatObject(item)[prop];
                    return;
                }
                reformedFlight[prop] = item[prop]
            });
        
            reformedFlight["start_destination"] = formatObject(await Destination.findOne({ '_id': uuidToBin(item.start_destination_id) }));
            reformedFlight["final_destination"] = formatObject(await Destination.findOne({ '_id': uuidToBin(item.final_destination_id) }));

            arrFlight.push(reformedFlight);
        });

        return arrFlight;
    }
    else {
        const reformedFlight = {};

        Object.keys(flight._doc).map(prop => {
            if (prop == "_id") {
                reformedFlight[prop] = formatObject(flight)[prop];
                return;
            }
            reformedFlight[prop] = flight[prop]
        });
    
        reformedFlight["start_destination"] = formatObject(await Destination.findOne({ '_id': uuidToBin(flight.start_destination_id) }));
        reformedFlight["final_destination"] = formatObject(await Destination.findOne({ '_id': uuidToBin(flight.final_destination_id) }));
        
        return reformedFlight;
    }
}

module.exports = reformedFlight;