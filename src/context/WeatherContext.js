import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  const apiKey = process.env.REACT_APP_WEATHERBIT_API;

  // Şehir listesini yükle (senin JSON dosyan olabilir)
  useEffect(() => {
    fetch("/turkeyCities.json")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setSelectedCity(data[0].name);
      })
      .catch((err) => console.error("Şehir verisi yüklenemedi:", err));
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      if (cities.length === 0) return;

      const selected = cities.find(
        (c) => c.name.toLocaleLowerCase("tr-TR") === cityName.toLocaleLowerCase("tr-TR")
      );
      if (!selected) {
        console.error(`Şehir bulunamadı: ${cityName}`);
        setLoading(false);
        return;
      }

      // Weatherbit API isteği (7 günlük forecast endpoint)
      // Örnek: https://api.weatherbit.io/v2.0/forecast/daily?lat=36.9914&lon=35.3308&key=API_KEY&lang=tr&units=M
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${selected.latitude}&lon=${selected.longitude}&key=${apiKey}&lang=tr&units=M`;

      const response = await axios.get(url);

      // response.data.data dizisi içinde günlük tahminler var
      setWeatherData(response.data.data.slice(0, 7)); // İlk 7 günü al
      setLoading(false);
    } catch (error) {
      console.error("Hava durumu alınamadı:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cities.length > 0 && selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity, cities]);

  return (
    <WeatherContext.Provider
      value={{ weatherData, selectedCity, setSelectedCity, loading, cities }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
