const Weather = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <div style={{ marginTop: 5 }}>
      <h2>Weather in {weather.name}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
