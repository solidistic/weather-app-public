const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic29saWRpc3RpYyIsImEiOiJjangxajMwN2MwOWloM3lwNGEyN2t3Z3FsIn0.et1fsmEwzunQsijXmDgN9g&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable, to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try with another search.", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
