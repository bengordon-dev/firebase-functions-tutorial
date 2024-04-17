import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { db } from './firebase';
import { onValue, ref, push } from "firebase/database";

function App() {
  const [count, setCount] = useState(0)
  const [cities, setCities] = useState([])

  useEffect(() => {
    const query = ref(db, `/cities`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setCities(Object.values(data))
      }
    });
  }, []);

  function addCity() {
    const cityInput = document.getElementById('cityInput')
    const stateInput = document.getElementById('stateInput')
    const countryInput = document.getElementById('countryInput')
    if (cityInput.value && cityInput.value !== "") {
      let wholeRef = ref(db, '/cities')
      push(wholeRef, {name: cityInput.value, state: stateInput.value, country: countryInput.value})
      cityInput.value = ""
      stateInput.value = ""
      countryInput.value = ""
    }

  }

  return <div id="page" className='flexCol'>
    <h2>Cities</h2>
    {cities.map((e, i) => <div key={i} className='flexRow'>
      <p><b>{e.name}</b></p>
      <p>{e.coords ? `: ${e.coords.lat} ${e.coords.long}` : ""}</p>
      </div>)}
    <div className="newCity flexRow">
      <div className='flexCol'>
        <input id="cityInput"/>
        <label>City Name</label>
      </div>
      <div className='flexCol'>
        <input id="stateInput"/>
        <label>State/Province Code</label>
      </div>
      <div className='flexCol'>
        <input id="countryInput"/>
        <label>Country Code</label>
      </div>
      <button onClick={addCity}>Add City</button>
    </div>
  </div>
}

export default App
