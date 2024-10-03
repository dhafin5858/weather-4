import { useState, useEffect } from "react";  
import { Sun, Cloud, Rain, Snow, Wind } from "lucide-react";  

const API_KEY = "de07bfc5ad39ac445f9602cdc10fa0d9";  

const CITIES = ["Jakarta", "Tokyo", "New York", "London", "Sydney"];  

function getWeatherDescription(code) {  
  switch (code) {  
    case 0:  
      return "Clear Sky";  
    case 1:  
    case 2:  
      return "Partly Cloudy";  
    case 3:  
      return "Overcast";  
    case 4:  
    case 5:  
    case 6:  
      return "Precipitation";  
    default:  
      return "Unknown";  
  }  
}  

function WeatherCard({ data, isSearched = false }) {  
  return (  
    <div  
      className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 ${  
        isSearched  
          ? " border-2 bg-gradient-to-r from-gray-800 to-neutral-900 rounded-lg hover:scale-105 transition duration-500"  
          : ""  
      }`}  
    >  
      <div className="flex items-center justify-center text-2xl font-bold mb-4">  
        {data.city}, {data.country}  
      </div>  
      <div className="flex items-center justify-center text-4xl font-bold mb-4">  
        {data.temperature.toFixed(1)}°C  
      </div>  
      <div className="flex items-center justify-center text-2xl mb-4">  
        {data.weathercode === 0 ? (  
          <Sun size={32} />  
        ) : data.weathercode === 1 || data.weathercode === 2 ? (  
          <Cloud size={32} />  
        ) : data.weathercode === 3 ? (  
          <Rain size={32} />  
        ) : data.weathercode === 4 || data.weathercode === 5 || data.weathercode === 6 ? (  
          <Snow size={32} />  
        ) : (  
          <Wind size={32} />  
        )}  
        <span className="ml-2">{getWeatherDescription(data.weathercode)}</span>  
      </div>  
      <div className="flex items-center justify-center text-2xl">  
        <span className="mr-2">Wind:</span>  
        {data.windspeed.toFixed(1)} m/s  
      </div>  
    </div>  
  );  
}  

export default function WeatherLandingPage() {  
  const [weatherData, setWeatherData] = useState([]);  
  const [searchedWeatherData, setSearchedWeatherData] = useState(null);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  
  const [searchCity, setSearchCity] = useState("");  

  useEffect(() => {  
    const fetchWeatherData = async () => {  
      setLoading(true);  
      try {  
        const weatherPromises = CITIES.map(async (city) => {  
          const response = await fetch(  
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`  
          );  
          const data = await response.json();  
          return {  
            city: data.name,  
            country: data.sys.country,  
            temperature: data.main.temp,  
            weathercode: data.weather[0].id,  
            windspeed: data.wind.speed,  
          };  
        });  
        const weatherData = await Promise.all(weatherPromises);  
        setWeatherData(weatherData);  
        setError(null);  
      } catch (err) {  
        setError(err.message);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchWeatherData();  
  }, []);  

  const handleSearch = async (e) => {  
    e.preventDefault();  
    setLoading(true);  
    try {  
      const response = await fetch(  
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`  
      );  
      if (!response.ok) {  
        throw new Error(`Error fetching weather data for ${searchCity}`);  
      }  
      const data = await response.json();  
      setSearchedWeatherData({  
        city: data.name,  
        country: data.sys.country,  
        temperature: data.main.temp,  
        weathercode: data.weather[0].id,  
        windspeed: data.wind.speed,  
      });  
      setError(null);  
    } catch (err) {  
      setError(err.message);  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">  
      <div className="bg-gray-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-8 w-full max-w-4xl">  
        <div  
          className={`mb-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4`}  
        >  
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center text-black">  
            <input  
              type="text"  
              value={searchCity}  
              onChange={(e) => setSearchCity(e.target.value)}  
              placeholder="Enter a city"  
              className="px-4 py-2 rounded-lg border-2 border-white focus:outline-none focus:border-grey-500 mr-4 w-full mb-4 md:mb-0 md:w-auto"  
            />  
            <button  
              type="submit"  
              className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto"  
            >  
              Search  
            </button>  
          </form>  
        </div>  
        {loading ? (  
          <div className="text-4xl font-bold">Loading...</div>  
        ) : error ? (  
          <div className="text-4xl font-bold">{error}</div>  
        ) : (  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">  
            {searchedWeatherData && (  
              <WeatherCard key="searched-weather" data={searchedWeatherData} isSearched />  
            )}  
            {weatherData.map((data, index) => (  
              <WeatherCard key={index} data={data} />  
            ))}  
          </div>  
        )}  
      </div>  
    </div>  
  );  
}