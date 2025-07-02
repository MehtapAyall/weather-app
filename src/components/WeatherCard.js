import "../css/WeatherCard.css";
import { useWeather } from "../context/WeatherContext";

function WeatherCard() {
  const { weatherData, loading } = useWeather();

  // Tarih stringi ile gün adı al
  const getDayName = (dateString) => {
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="card-container">
      {weatherData.map((day, index) => (
        <div
          className={`card ${index === 0 ? "today" : ""}`}
          key={day.valid_date} // uniq key olarak valid_date kullan
        >
          <h3>{getDayName(day.valid_date)}</h3>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
            alt={day.weather.description}
          />
          <p>🌡️ {Math.round(day.max_temp)}° / {Math.round(day.min_temp)}°</p>
          <p>{day.weather.description}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherCard;
