import "./App.css";
import { WeatherProvider } from "./context/WeatherContext";
import WeatherCard from "./components/WeatherCard";
import CitySelector from "./components/CitySelector";

function App() {
   return (
    <WeatherProvider>
        <div className="App">
          <h1>Türkiye Hava Durumu</h1>
          <CitySelector />
          <WeatherCard />
        </div>
    </WeatherProvider>
  );
}

export default App;
