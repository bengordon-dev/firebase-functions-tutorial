const {onValueCreated} = require("firebase-functions/v2/database");

const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getCoords = onValueCreated(
  "/cities/{pushId}",
  async (event) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = event.data.val();
    logger.log("Getting geo coords", event.params.pushId, original);
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${original.name},${original.state},${original.value}&limit=1&appid=${process.env.WEATHER_API_KEY}`)
    const data = await res.json()
    return event.data.ref.child("coords").set({lat: data[0].lat, long: data[0].lon});
  },
);