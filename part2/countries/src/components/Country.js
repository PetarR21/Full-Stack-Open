import axios from 'axios';
import { useState, useEffect } from 'react';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [country.capital]);

  console.log(weather);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.svg || country.flags.svg} alt={country.flags.alt} width='200' />

      <h2>Wheather in {country.capital}</h2>
      {weather && (
        <div>
          <div>temperature {weather.main.temp} Celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default Country;
