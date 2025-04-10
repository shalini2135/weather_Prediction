import React, { useEffect ,useRef,useState} from 'react';
import './Weather.css';
import search_icon from '/src/assets/search.png';
import clear_icon from '/src/assets/clear.webp';
import cloud_icon from '/src/assets/cloud.jpg';
import drizzle_icon from '/src/assets/drizzle.jpg';
import snow_icon from '/src/assets/snow.jpg';
import wind_icon from '/src/assets/wind.jpg';
import humidity_icon from '/src/assets/humid.jpg';

const Weather = () => {
  const inputRef=useRef()
   const [weatherData, setWeatherData] = useState(false);
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }
  const search = async (city) => {
    if(city==="") {alert("Enter City Name"); return;}
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      // handle your data here
      if(!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
    
      const icon=allIcons[data.weather[0].icon]||clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon
      })
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };
  const handlePredictClick = () => {
    window.location.href = 'view.html'; // Redirect to view.html
  };

  // useEffect(() => {
  //   search("London");
  // }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" width="70" height="50" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="Location">{weatherData.location}</p>
      
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        
        <div className="col">
          <img src={wind_icon} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>

      {/* Predict button with onClick event */}
    
      </>:<></>}
    
    </div>
  );
};

export default Weather;
