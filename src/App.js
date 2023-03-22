import { useState } from 'react'
import './App.css';


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setLocation('')
    }
  }

  return (
    <div className='app-container'>
      <div className='inner-container'>
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='Search City'
          onKeyDown={handleSearch}
          type='text'
        />
        <div className='city-title'>
          {data.location ? <h1>{data.location.name}</h1> : null}
        </div>

        <div className='current-weather-container'>
          {data.current ? <p>{data.current.temp_f.toFixed()}°F</p> : null}
          {data.current ? <span>{data.current.condition.text}</span> : null}
        </div>
        <div>
          {data.forecast ? <span>High: {data.forecast.forecastday[0].day.maxtemp_f.toFixed()}°F</span> : null}
          {data.forecast ? <span>Low: {data.forecast.forecastday[0].day.mintemp_f.toFixed()}°F</span> : null}
        </div>

        <div className='forecast-container'>
          {data.forecast ? data.forecast.forecastday.map((day, index) => (
            <div key={index} className='forecast-day'>
              <p className='forecast-date'>{day.date}</p>
              <div className='forecast-details'>
                <div className='forecast-icon'>
                  <img src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
                <div className='forecast-temps'>
                  <p className='forecast-temp-high'>High: {day.day.maxtemp_f.toFixed()}°F</p>
                  <p className='forecast-temp-low'>Low: {day.day.mintemp_f.toFixed()}°F</p>
                </div>
              </div>
            </div>
          )) : null}
        </div>

      </div>
    </div>
  );
}

export default App;
