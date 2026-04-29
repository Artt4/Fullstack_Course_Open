import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getSchema(capital)
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log("Weather fetch failed", error));
  }, [capital]);

  if (!weather) return null;

  const current = weather.current_condition[0];

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {current.temp_C} Celsius</p>
      <p>Wind {current.windspeedKmph} km/h</p>
    </div>
  );
};

export default Weather;
