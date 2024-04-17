# firebase-functions-tutorial
Starter code for Texas Convergent subteams

When a new document is added to `/cities` in the RTDB,
specifying a city name, state/province code (2 letters), and country code (2 letters),
the function makes a request to the [OpenWeatherMap GeoCoding API](https://openweathermap.org/api/geocoding-api)
and writes the coordinates given in the result (lat and long) to `cities/${documentID}/coords`
