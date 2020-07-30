// new code using node-fetch, promises and async await 

const fetch = require('node-fetch')

const forecast = async (lat, long) => {

    try {
        const weatherlink = `https://api.darksky.net/forecast/${process.env.darksky_key}/${lat},${long}?units=si`

        const res = await fetch(weatherlink)
        const data = await res.json()

        if (data.error) {
            throw new Error()
        }
        else {
            const output = `The temperature is ${Math.round(data.currently.temperature)}°C and the humidity is ${Math.round(data.currently.humidity * 100)}%`
            return [undefined, output];
        }

    } catch {
        return ["Unable to connect to darksky API.", undefined]
    }
};

module.exports = forecast






// old code using request and callback functions

// const request = require('request');

// const forecast = (lat, long, callback) => {

//     const weatherlink = `https://api.darksky.net/forecast/${process.env.darksky_key}/`
//         + lat + "," + long + "?units=si";

//     request({ url: weatherlink, json: true }, (error, response) => {
//         if (error) {
//             callback("Unable to connect to darksky API.", undefined);
//         }
//         else if (response.body.error) {
//             callback("Darksky API unable to connect. Contact the admin.", undefined);
//         }
//         else {
//             const data = "The temperature is " + Math.round(response.body.currently.temperature) + 
//                 "°C and the humidity is " + Math.round(response.body.currently.humidity * 100) + "%";
//             callback(undefined, data);
//         }
//     });
// };