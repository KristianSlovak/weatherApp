import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './hooks/getWeatherData';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [query, setQuery] = useState({q: 'berlin'});
  const [units, setUnits] = useState({units: 'metric'})
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message)
      await getFormattedWeatherData({...query, ...units})
      .then(data => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data)
      })
    }
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'
    const treshold = units.units === 'metric' ? 20 : 60
    if(weather.temp <= treshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700
     to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      
      {weather && (
        <div>
        <TimeAndLocation weather={weather}/>
        <TemperatureAndDetails weather={weather}/>
  
        <Forecast title='Hourly Forcast' items={weather.hourly}/>
        <Forecast title='Daily Forcast' items={weather.daily}/>
        </div>
  )}
  <ToastContainer autoClose={3000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;
