
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from '@iconify/react';
 

function Weather() {
  const [name, setName] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({});

  function handleChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }
   

  function handleClick(event) {
    setCityName(name);

    event.preventDefault();
  }

  const getWeatherData = async () => {
    const unit = "metric";
     const Key="78f82a225ffaf340ffce8e0bbc3decd3";
    const city = cityName;

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" +Key+ "&units=" + unit);
    setWeatherData(response.data);
  };

  useEffect(() => {
    getWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName]);

  let img;
  if (weatherData.weather) {
    img = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  }

  return (
    <div class="container">
      <div className="bar">
        <form onSubmit={handleClick}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Check city weather"
            value={name}
            
          />
           <button type="submit" class="searchButton">  <Icon icon="ic:baseline-search" color="#393e46" width="40" height="30" />
     </button>
         
        </form>
        </div>
      <div class="card">
     
        <h1>Current weather in</h1>
        <br />
     

        <div class="contentBx">
          <h2>
          <Icon icon="gis:search-country" color="#393e46" width="40" height="30" /> {weatherData.name} {weatherData.weather && (
              <img src={img} alt="weather icon" />
            )}
          </h2>
          <br />
          <h3>Weather Description:"<Icon icon="material-symbols:description" color="#393e46" width="40" height="30" />{weatherData.weather && weatherData.weather[0].description} "</h3>
          <br />
          <h3>Temp: {weatherData.main && weatherData.main.temp} <Icon icon="raphael:temp" color="#393e46" width="40" height="30" /></h3>
          <br />
          <h3>Humidity: {weatherData.main && weatherData.main.humidity}<Icon icon="wi:humidity" color="#393E46"  width="50" height="40" /></h3>
          <br/>
          <h3>Longitude: {weatherData.coord && weatherData.coord.lon}<Icon icon="mdi:longitude" color="#393e46" width="40" height="30" /></h3>
          <br />
          <h3>Latitude: {weatherData.coord && weatherData.coord.lat}<Icon icon="tabler:world-latitude" color="#393e46" width="40" height="30" /></h3>
       
          
        </div>
       
      </div>
    
    </div>
  );
}

export default Weather;