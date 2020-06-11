const request = require("request");
const forecast = (lat, lon, callback) => {
  const url = `
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=79c6c8eed33edade96ab182a65cc8338`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to weather service", undefined);
    } else if (body.message) {
      callback(`Unable to find location.`, undefined);
    } else {
      callback(undefined, `It's currently ${body.main.temp} degrees out. Wind speed is ${body.wind.speed}`);
    }
  });
};

module.exports = forecast;
