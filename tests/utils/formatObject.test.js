require("../../configs/mongoose");
const Destination = require("../../models/DestinationModel");
const formatObject = require("../../utils/formatObject");
const destinationService = require("../../services/destinationService");

test('Transforma _id Buffer em UUID', async () => {
    const destinationToInsert = new Destination({
        city_name: "teste",
        zipcode: "teste",
        city_tag: "teste",
        country: "teste"
    });

    await destinationToInsert.save();

    const destination = (await destinationService.findAll())[0];
    const pureDestination = (await Destination.find())[0];

    expect(destination._id).toHaveLength(36);
    expect(formatObject(pureDestination)).toStrictEqual(destination);

    const destinations = await destinationService.findAll();
    const pureDestinations = await Destination.find();
    
    expect(formatObject(pureDestinations)).toStrictEqual(destinations);
    
    await Destination.findOneAndDelete({ city_name: "teste" });
});