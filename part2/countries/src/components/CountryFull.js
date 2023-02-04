import axios from 'axios';
import { useEffect, useState } from 'react';

import Weather from './Weather';

const CountryFull = ({ country, setShow }) => {
  const APIKey = process.env.REACT_APP_API_KEY;
  const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${APIKey}&units=metric`;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log(response.data);
      setWeather(response.data);
    });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      {setShow && (
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          hide
        </button>
      )}
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img
          className='flag'
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt}
        />
      </div>
      <Weather weather={weather} />
    </div>
  );
};

export default CountryFull;
