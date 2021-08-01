const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Janne Mulari",
    email: "janne.mulari@gmail.com"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Janne Mulari",
    email: "janne.mulari@gmail.com"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Janne Mulari",
    email: "janne.mulari@gmail.com",
    message: "Please provide the issue you need assistance with."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }
  geocode(req.query.address, (err, { lat, long, location } = {}) => {
    if (err) {
      return res.send({
        error: "Invalid place name. Please try again."
      });
    } else {
      forecast(lat, long, (err, forecastData) => {
        if (err) {
          return res.send({
            error: "Unable to find weather. Please try again "
          });
        } else {
          return res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Janne Mulari",
    email: "janne.mulari@gmail.com"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
    name: "Janne Mulari",
    email: "janne.mulari@gmail.com"
  });
});

app.listen(port, () => {
  console.log("Express server is running on port " + port);
});
