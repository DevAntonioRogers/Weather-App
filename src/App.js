import { useState } from 'react'
import './App.css';

import { ThreeDots } from 'react-loader-spinner'


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      setLocation('')
      setTimeout(async () => {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
        setLoading(false)
      }, 1000)

    }
  }

  return (


    <div className='app-container' >
      <div className='inner-container'>
        {loading ? <div>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div> : (
          <>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder='Search City'
              onKeyDown={handleSearch}
              type='text'
            />



            <div className='current-weather-container'>
              <div className='location-name'>
                {data.location ? <h1>{data.location.name}</h1> : null}
              </div>

              <div>
                {data.current ? <p className='current-weather'>{data.current.temp_f.toFixed()}°</p> : null}
                {data.current ? <span className='current-weather-condition'>{data.current.condition.text}</span> : null}
              </div>
              <div>
                {data.forecast ? <span>High: {data.forecast.forecastday[0].day.maxtemp_f.toFixed()}°</span> : null}
                {data.forecast ? <span>Low: {data.forecast.forecastday[0].day.mintemp_f.toFixed()}°</span> : null}
              </div>
            </div>

            <div className='forecast-container'>
              <span className='forecast-title'>7 Day Forecast</span>
              {data.forecast ? data.forecast.forecastday.map((day, index) => (
                <div key={index} className='forecast-day'>
                  <p className='forecast-date'>{day.date}: </p>
                  <img className='forecast-icon' src={day.day.condition.icon} alt={day.day.condition.text} />
                  <p className='forecast-temp-high'>High: {day.day.maxtemp_f.toFixed()}°</p>
                  <p className='forecast-temp-low'>Low: {day.day.mintemp_f.toFixed()}°</p>
                </div>
              )) : null}
            </div>

          </>)}
      </div>
    </div>
  );
}

export default App;
