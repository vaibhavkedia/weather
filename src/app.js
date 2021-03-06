const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "vaibhav kedia",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello express!");
// });

// app.get("/help", (req, res) => {
//   res.send("Help page");
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vaibhav kedia",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Assume this is some helpful text",
    name: "Vaibhav kedia",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, { time, msg }) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          time,
          forecast: msg,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vaibhav kedia",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vaibhav kedia",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
