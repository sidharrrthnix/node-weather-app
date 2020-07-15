const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sidharrth Mahadevan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Sidharrth Mahadevan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Sidharrth Mahadevan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address field",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: forecastData,

        place,

        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up and running at port " + port);
});
