require('dotenv').config()
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
 
// if app is deployed, use port provided buy environment else use 3000
const port = process.env.PORT || 3000;


// Setup static directory to serve. Public directory contains the static assests.
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));


// Setup handle bars engine. Directory: templates/views and templates/partials
app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "..", "templates/views");
app.set("views", viewsPath);
const partialsPath = path.join(__dirname, "..", "templates/partials");
hbs.registerPartials(partialsPath);


app.get('/', (req, res) => {
    res.render("index", {
        title: "Weather Right Now",
        author: "Paawan Kohli"
    });
});


app.get('/about', (req, res) => {
    res.render("about", {
        title: "About",
        author: "Paawan Kohli"
    });
});


// app.get('/help', (req, res) => {
//     res.render("help", {
//         title: "Help",
//         message: "This is the help message.",
//         author: "Paawan"
//     });
// });


// // Learning purpose only
// app.get('/products', (req, res) => {
//     console.log(req.query);
//     res.send({
//         products: []
//     });
// });


app.get('/weather', (req, res) => {

    // handle error when address query string is not provided
    if (!req.query.address) {    
     
        res.send({
            success: false,
            errorCode: 777,
            errorMessage: "No address provided.",
        });
        
        return;
    }

    const geocode = require("./utils/geocode.js");
    const forecast = require("./utils/forecast.js");
    const input = req.query.address;

    geocode(input, (error1, data1) => {

        // handle error encounter by mapbox api
        if (error1) {
            res.send({
                success: false,
                errorCode: 888,
                errorMessage: error1,
                input: input
            });
            return;
        }

        // if no errors occured the ask dark ski API for data based on mapbox's coordinates
        forecast(data1.latitude, data1.longitude, (error2, data2) => {

            // handle error encountered by darksky api
            if (error2) {
                res.send({
                    success: false,
                    errorCode: 999,
                    errorMessage: error2,
                    input: input
                });
                return;
            }

            // respond if everything goes well
            res.send({
                success: true,
                input: input,
                place_name: data1.place_name,
                forecast: data2
            });

        });

    });

});





// app.get("/help/*", (req, res) => {
//     res.render("error", {
//         title: "Error",
//         errorCode: 405,
//         errorMessage: "Help article not found!",
//         author: "Paawan"
//     });
// });



app.get("*", (req, res) => {
    res.render("error", {
        title: "Error",
        errorCode: "404",
        errorMessage: "Can't find page",
        author: "Paawan Kohli"
    });
});




app.listen(port, () => {
    console.log("Server is up on port " + port);
});