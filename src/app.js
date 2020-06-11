const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// for handling static views, which we no longer using
// handlebars is used to render dynamic pages
app.use(express.static(publicDirectoryPath));

let date = new Date();
let todayDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

app.get("", (req, res) => {
  res.render("index", {
    name: "Femi Ogungbade",
    year: new Date().getFullYear(),
    title: "Weather",
    todayDate,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Provide a search term",
    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You provided no address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }
      
      res.send({
        forecast: forecastdata,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Welcome to the help page",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not found",
  });
});
app.listen(port, () => {
  console.log("Server is running on "+ port);
});
