
import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");
  const [weatherData, setWeatherData] = useState({});

  function handleChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  function handleClick(event) {
    setHeading(name);

    event.preventDefault();
  }

  const getWeatherData = async () => {
    const unit = "metric";
    const Key = "78f82a225ffaf340ffce8e0bbc3decd3";
    const city = headingText;

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        Key +
        "&units=" +
        unit
    );
    setWeatherData(response.data);
  };

  useEffect(() => {
    getWeatherData();
  }, [headingText]);

  let img;
  if (weatherData.weather) {
    img = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  }

  return (
    <div class="container">
      <div class="card">
     
        <h1>Current weather </h1>
        <br />
     

        <div class="contentBx">
          <h2>
            {weatherData.name} {weatherData.weather && (
              <img src={img} alt="weather icon" />
            )}
          </h2>
          <br />
          <h3>Weather Description: {weatherData.weather && weatherData.weather[0].description}</h3>
          <br />
          <h3>Temp: {weatherData.main && weatherData.main.temp}</h3>
          <br />
          <h3>Longitude: {weatherData.coord && weatherData.coord.lon}</h3>
          <br />
          <h3>Latitude: {weatherData.coord && weatherData.coord.lat}</h3>
          <h3>Humidity: {weatherData.main && weatherData.main.humidity}</h3>
        </div>
       
      </div>
      <div className="wrap">
        <form onSubmit={handleClick}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Check city weather"
            value={name}
            
          />
           <button type="submit" class="searchButton">  ☁️
     </button>
         
        </form>
        </div>
    </div>
  );
}

export default Weather;