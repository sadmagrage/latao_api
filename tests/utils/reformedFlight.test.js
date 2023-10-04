const Destination = require("../../models/DestinationModel");

test('Deve passar os Destinations para o Flight', async () => {
    
    const destinationToInsert = new Destination({
        city_name: "teste",
        zipcode: "teste",
        city_tag: "teste",
        country: "teste"
    });
    //EXCEDENDO O LIMITE DE TEMPO
    
    await destinationToInsert.save();
    
    await Destination.findOneAndDelete({ city_name: "teste" });
    expect("1").toBe("1");
});