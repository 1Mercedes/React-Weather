import React, { ChangeEvent, FormEvent, useState } from 'react'
import logo from './logo.svg'
import { WeatherForecast} from './weatherTypes'

const writeTitle = (weather: WeatherForecast | null)=>{
  if(weather === null){
    return 'Enter your city'
  }else if('error' in weather){
    return weather.error?.message
  }else{
    return `${weather.location?.country}, ${weather.location?.name}`
  }
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<null | WeatherForecast>(null)
  const handleCityWrite = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        'x-rapidapi-key': '45003564e1msh7d9cf50bf068e99p18184djsn26b64859fac9',
      },
    })
    const info: WeatherForecast = await data.json()
      setWeather(info)
  }
  return (
    <div className="App">
      <header className="header container">
        <img src={logo} alt="React Logo" className="header__logo" />
        <h1 className="header__title">React Weather App</h1>
      </header>
      <form className="search container" onSubmit={handleSubmit}>
        <input type="text" className="search__input" value={city} onChange={handleCityWrite} />
        <button type="submit" className="search__button">
          Get Weather
        </button>
      </form>
      <div className="info container">
        <h2 className="info__region">{writeTitle(weather)}</h2>
        {weather !== null && typeof weather !== 'string' && (
          <div className="info__data">
            <h3 className="info__type">Now:</h3>
            <div className="info__item">
              Temperature: <span>{weather.current?.temp_c}&deg;C</span>
            </div>
            <div className="info__item">
              Feels like: <span>{weather.current?.feelslike_c}&deg;C</span>
            </div>
            <div className="info__item">
              Humidity: <span>{weather.current?.humidity}%</span>
            </div>
            <div className="info__item">
              Pressure: <span>{weather.current?.pressure_mb} mb</span>
            </div>
            <div className="info__item">
              Visibility: <span>{weather.current?.vis_km} km</span>
            </div>
            <div className="info__item">
              Wind: <span>{weather.current?.wind_kph}km/h</span>
            </div>
            <div className="info__item">
              Wind degree: <span>{weather.current?.wind_degree}&deg;C</span>
            </div>
            <div className="info__item">
              UV Index: <span>{weather.current?.uv} of 10</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
