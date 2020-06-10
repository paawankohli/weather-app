const request = require('request');

const forecast = (lat, long, callback) => {

    const weatherlink = `https://api.darksky.net/forecast/${process.env.darksky_key}/`
        + lat + "," + long + "?units=si";

    request({ url: weatherlink, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to darksky API.", undefined);
        }
        else if (response.body.error) {
            callback("Darksky API unable to connect. Contact the admin.", undefined);
        }
        else {
            const data = "The temperature is " + Math.round(response.body.currently.temperature) + 
                "°C and the humidity is " + Math.round(response.body.currently.humidity * 100) + "%";
            callback(undefined, data);
        }
    });
};

module.exports = forecast;