import {useState, useEffect} from 'react'
import axios from 'axios'

const Maa = ({ maa }) => {
    const [weather, setWeather] = useState(null)
  
    useEffect(() => {
      const capital = maa.capital;
      const avain = '4710cd3f9431ffe28a32d2400a489e3d'
  
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${avain}&units=metric`)
        .then((response) => {
          const apiData = response.data
          setWeather(apiData)
        })
        .catch((error) => {
          console.log(error)
        });
    }, [maa.capital])
  
    if (weather) {
      const tempData = weather.main
      const iconData = weather.weather[0]
      const windData = weather.wind
      console.log(maa.flag)
  
      return (
        <div>
          <h1>{maa.name.common}</h1>
          <p>Capital: {maa.capital}</p>
          <p>Area: {maa.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(maa.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={maa.flags.png}/>
          <h2>Weather in {maa.capital}</h2>
          <p>Temperature: {tempData.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${iconData.icon}@2x.png`}Z   />
          <p>Wind: {windData.speed} m/s</p>
        </div>
      )
    }
  
    return (
      <div>
        <h1>{maa.name.common}</h1>
        <p>Capital: {maa.capital}</p>
        <p>Area: {maa.area}</p>
        <h2>Languages</h2>
        <p>No language information available</p>
        <img src={maa.flag} alt="Flag" />
        <h2>Weather information not found</h2>
      </div>
    )
  }
  
  export default Maa