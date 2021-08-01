const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}?units=si`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback(
        "Unable to load weather with given coordinates. Please try again with another search.",
        undefined
      );
    } else {
      const current = body.currently;
      const daily = body.daily.data[0];
      callback(
        undefined,
        `${daily.summary} It is currently ${
          current.temperature
        }&#176C out. There is ${
          current.precipProbability
        }% change of rain. Today's windspeed is ${
          daily.windSpeed
        }m/s. Temperature can rise up to ${
          daily.apparentTemperatureHigh
        }&#176C and it shouldn't go lower than ${daily.apparentTemperatureLow}&#176C.`
      );
    }
  });
};

module.exports = forecast;
