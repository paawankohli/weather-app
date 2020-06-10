const request = require('request');

const geocode = (address, callback) => {
    const locationlink = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
        encodeURIComponent(address) + ".json" + 
        `?access_token=${process.env.mapbox_key}` + 
        "&limit=1";

    request( {url: locationlink, json: true}, (error, response) => {

        if (address.length === 0) {
            callback("Please enter a location.", undefined);
        }
        else if (error) {
            callback("Mapbox API unable to connect. Contact the admin.", undefined);
        } 
        else if (response.body.features.length === 0) {
            callback("Sorry we can't not find this location. Try a different location.", undefined);
        } 
        else {
            const data = {
                place_name: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            };

            callback(undefined, data);
        }
    });
};

module.exports = geocode;