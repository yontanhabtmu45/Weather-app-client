import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import searchIcon from "../assets/Icons/clouds/search-26.png";
import fewCloud from "../assets/Icons/clouds/few-cloud.png";
import cloudIcon from "../assets/Icons/clouds/cloud-96.png";
import drizzleIcon from "../assets/Icons/clouds/drizzle-96.png";
import humidityIcon from "../assets/Icons/clouds/humidity.gif";
import rainIcon from "../assets/Icons/clouds/rain-cloud-96.png";
import snowIcon from "../assets/Icons/clouds/snow-96.png";
import sunnyIcon from "../assets/Icons/clouds/sunny-96.png";
import windIcon from "../assets/Icons/clouds/wind.gif";
import maxTemp from "../assets/Icons/Temp/max-temperature.png";
import minTemp from "../assets/Icons/Temp/min-temperature.png";
import airDir from "../assets/Icons/arrows/weather-station-wind.gif"
import barometer from "../assets/Icons/arrows/barometer.gif"

function Weather() {
  const inputRef = useRef();

  const [WeatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": sunnyIcon,
    "01n": sunnyIcon,
    "02d": fewCloud,
    "02n": fewCloud,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };


  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=653d278f66ed6efdb8fc8af9a2ca4d9f`;

      const response = await fetch(url);
      const data = await response.json();

      

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sunnyIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        temprature: Math.floor(data.main.temp),
        maxTemp: data.main.temp_max,
        minTemp: data.main.temp_min,
        location: data.name,
        icon: icon,
        feels: data.main.feels_like,
        pressure: data.main.pressure,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    search("Addis Ababa");
  }, []);

  return (
    <div className="wrapper">
      <div className="weather">
        <div className="search-box">
          <input ref={inputRef} type="text" placeholder="Search City" 
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          search(inputRef.current.value)
                        }}
          />
          <img
            src={searchIcon}
            alt=""
            onClick={() => search(inputRef.current.value)}
          />
        </div>


        {WeatherData ? (
          <>
            <br />
            <img src={WeatherData.icon} alt="" className="weather-icon" />
            <p className="temprature">{WeatherData.temprature}°C</p>
            <p className="location">{WeatherData.location}</p>

            <div className="weather-data">
              <div className="col">
                <img src={humidityIcon} alt="" />
                <div>
                  <p>{WeatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={windIcon} alt="" />
                <div>
                  <p>{WeatherData.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="daily-info">
        <div className="today">
          <div className="sessions">
            FEELS LIKE <br />
            <div className="info">
              <div className="weather-info">
                <img src={WeatherData.icon} alt="" />
              </div>
              <div className="weather-desc">{WeatherData.feels}°C</div>
            </div>
          </div>
          <div className="sessions">
            MAX TEMPERATURE <br />
            <div className="info">
              <div className="weather-info">
                <img src={maxTemp} alt="" />
              </div>
              <div className="weather-desc">{WeatherData.maxTemp}°C</div>
            </div>
          </div>
          <div className="sessions">
            MIN TEMPERATURE <br />
            <div className="info">
              <div className="weather-info">
                <img src={minTemp} alt="" />
              </div>
              <div className="weather-desc">{WeatherData.minTemp}°C</div>
            </div>
          </div>
        </div>
        
        <div className="prediction">
          <div className="wind-direction">
            WIND DIRECTION <br /> <br />
            <div className="inner-temp">
              <img src={airDir} alt="" />
            </div>
              <div className="temp">{WeatherData.windDeg}°</div>
          </div>
          <div className="pressure">
            PRESSURE <br /> <br />
            <div className="inner-temp">
              <img src={barometer} alt="" />
            </div>
              <div className="temp">{WeatherData.pressure}hPa</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Weather;
