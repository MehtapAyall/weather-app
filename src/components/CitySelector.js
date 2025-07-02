import "../css/CitySelector.css";

import { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

function CitySelector() {
  const { selectedCity, setSelectedCity } = useWeather();

  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("/turkeyCities.json")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Şehir verileri yüklenemedi", err));
  }, []);

  return (
    <select
      value={selectedCity || ""} // null yerine boş string göster
      onChange={(e) => setSelectedCity(e.target.value)}
    >
      {cities.map((city, index) => (
        <option key={city.plate || index} value={city.name}>
          {city.name.charAt(0).toUpperCase() + city.name.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default CitySelector;
