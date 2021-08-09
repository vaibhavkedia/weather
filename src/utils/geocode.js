const request = require("postman-request");

const geocode = (address, callback) => {
  const urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmtlZGlhIiwiYSI6ImNrcno2eW93ejE3ZnEyd3M3c21sZmV1dDMifQ.WgNgZx1JLfUj4iaogvJL3A&limit=1`;

  request({ url: urlGeo, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable to connect to location service.Check your internet connection and try again!",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callback("Unable to find location.Try another location", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
