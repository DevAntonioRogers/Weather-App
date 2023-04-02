import { useState } from 'react'
import './App.css';

import { ThreeDots } from 'react-loader-spinner'
import Divider from '../src/shared/wavedivider.svg'



function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true)

      setTimeout(async () => {
        try {
          const response = await fetch(url)
          if (!response.ok) {
            throw new Error()
          }
          const data = await response.json()
          setData(data)
          setLoading(false)
          setLocation('')
          setError('')
        } catch (error) {
          setError('City not found bro')
          console.log(error)
          setData({})
          setLoading(false)
        }
      }, 1000)

    }
  }




  return (


    <div className='app-container' >
      <div className={`inner-container ${data.current && data.current.is_day === 0 ? "night" : ""} ${data.current && data.current.is_day > 0 ? "day" : ""}`}>
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


            {error ? <div><p>{error}</p></div> : (
              <div className='container'>
                <div className='current-weather-container'>
                  <div className='location-name'>
                    {data.location ? <h1>{data.location.name}</h1> : null}
                  </div>

                  <div>
                    {data.current ? <p className='current-weather'>{data.current.temp_f.toFixed()}<span className='temp-circle'>°</span></p> : null}
                    {data.current ? <span className='current-weather-condition'>{data.current.condition.text}</span> : null}
                  </div>
                  <div>
                    {data.forecast ? <span>High: {data.forecast.forecastday[0].day.maxtemp_f.toFixed()}°</span> : null}
                    {data.forecast ? <span>Low: {data.forecast.forecastday[0].day.mintemp_f.toFixed()}°</span> : null}
                  </div>
                </div>

                <div className='forecast-container'>
                  <div className='forecast-inner-container'>
                    {data.forecast ? data.forecast.forecastday.map((day, index) => (
                      <div key={index} className='forecast-day'>
                        <p className='forecast-date'>{new Date(day.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }).replace('/', '/')}</p>
                        <img className='forecast-icon' src={day.day.condition.icon} alt={day.day.condition.text} />
                        <div className='forecast-temps'>
                          <p className='forecast-temp-high'>H {day.day.maxtemp_f.toFixed()}°</p>
                          <p className='forecast-temp-low'>L {day.day.mintemp_f.toFixed()}°</p>
                        </div>
                      </div>
                    )) : null}
                  </div>
                </div>
              </div>)}

          </>)}
      </div>
    </div>
  );
}

export default App;