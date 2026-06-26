import { useState } from 'react'
import './App.css'

function App() {
  const [c, setc] = useState("");
  const [w , setw] = useState(null);

  async function getw() {
      const a = "d2d0c036d9ff4f94be0123753262406";

      const r = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=${a}&q=${c}&aqi=yes`
            );

      setw(await r.json());
  }

  return (
    <div className='con'>
      <input type='text' placeholder='Enter Your City' value={c} 
        onChange= {(e) => {
          setc(e.target.value)
      }} />
      <button onClick={getw}>Show Wether</button>
      {w && (
        <div>
          <h2>{w.location.name}</h2>
          <h3>{w.current.temp_c}°C</h3>
          <h3>{w.current.temp_f}°F</h3>
          <h3>Humadity : {w.current.humadity}</h3>
        </div>
      )}
    </div>
  )
}

export default App;
