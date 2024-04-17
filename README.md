# Firebase Functions Tutorial
Starter code for Texas Convergent subteams


## Cloud Function Description

see [frontend/functions/index.js](./frontend/functions/index.js)

When a new document is added to `/cities` in the RTDB,
specifying a city name, state/province code (2 letters), and country code (2 letters),
the function makes a request to the [OpenWeatherMap GeoCoding API](https://openweathermap.org/api/geocoding-api)
and writes the coordinates given in the result (lat and long) to `cities/${documentID}/coords`

## Necessary Environment Variable Files

Put your Firebase config in `frontend/.env.local`.

Put any API keys needed by the cloud function in `frontend/functions/.env`. It should be accessible without issue on both the local emulator and on the cloud.

## Frontend Description

Input a city and let the backend tell you its longitude and latitude. The code both reads from and writes to the Realtime Database. See [frontend/src/App.jsx](./frontend/src/App.jsx)

The frontend React app was created with Vite (`npm create vite@latest <name> -- --template react`) instead of Create React App (`npx create-react-app <name>`). This has 2 ramifications for my code, none of which should matter to you if you already have a project made with Create React App.

- In [frontend/src/firebase.js](./frontend/src/firebase.js), the variables defined in `frontend/.env.local` must be imported with `import.meta.env.NAME` instead of `process.env.NAME`
- Environment variables defined in `frontend/.env.local` have names starting with `VITE_` rather than `REACT_APP_`.



## Emulator instructions

Configure your project to include emulators in `firebase init`. The emulator makes testing your cloud function(s) significantly easier. You will at minimum need to emulate both the database and the functions; emulating hosting is probably a good idea too so you can play around with a frontend that can interact with the emulated services.

Run `firebase emulators:start` to start the local emulator.

## Other Notes

To deploy your functions, run `firebase deploy --only functions`. 

To deploy your frontend, run `npm run build` and then `firebase deploy --only hosting`. Make sure the "public" field of "hosting" in [frontend/firebase.json](frontend/firebase.json) is set to the directory where the output of `npm run build` goes to (in this repo it is not)

Billing is required in your Firebase project for Functions to work.
