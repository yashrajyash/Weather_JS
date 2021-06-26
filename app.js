const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const port = 3000;

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const apiKey = "cbb6b8a7a93022bfe48120a12e239d34";

    const unit = "metric";

    let city = req.body.cityName;

    let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=" +
        unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const name = weatherData.name;
            const temp = weatherData.main.temp;
            const discription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>City: " + name + "</p>");
            res.write("<p>weather disc: " + discription + "</p>");
            res.write("<h1>temp: " + temp + "</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });

    // res.sendFile(__dirname+'/sucess.html');
});

// app.post('/sucess', function(req, res) {
//     res.redirect('/');
// });

app.listen(port, function () {
    console.log("Your server has started at http://localhost:" + port);
});
