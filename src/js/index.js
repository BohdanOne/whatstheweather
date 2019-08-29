import axios from 'axios';
import UI from './ui';


const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';
// AccuWeather API endpoint
const geopositionURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
const forecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';


async function currentLocation(option) {
  try {
    // Push Geolocalisation coordinates to chosen functions
    if (navigator.geolocation) {
      if(option === 'current') {
        await navigator.geolocation.getCurrentPosition(getCurrentWeather);
      }
      if(option === 'forecast1') {
        await navigator.geolocation.getCurrentPosition(get1DayForecast);
      }
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch(err) {
    console.log(err);
  }
}

async function getCurrentWeather(position) {
  try {
    // Obtain LocationKey for AccuWeather API
    const key = await getLocationKeyFromGeo(position);

    // Obtain current weather condition from AccuWeather API
    const currentWeather = await axios.get(`${currentURL}${key}?apikey=${APIKEY}&details=true`)
      .then(res => res.data[0]);

    // Display Current Weather in App
    UI.displayWeather(currentWeather);

  } catch(err) {
    console.log(err);
  }
}

async function get1DayForecast(position) {
  try {
    // Obtain LocationKey for AccuWeather API
    const key = await getLocationKeyFromGeo(position);

    // Obtain forecast from AccuWeather API
    const forecast = await axios.get(`${forecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
                      .then(res => res.data.DailyForecasts[0]);
    console.log(forecast);

    // Display forecast in App
    UI.displayForecast(forecast);

  } catch(err) {
    console.log(err);
  }
}

async function getLocationKeyFromGeo(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const location = await axios.get(`${geopositionURL}?q=${lat},${long}&apikey=${APIKEY}`)
    .then(res => res.data)
  const key = location.Key;
  // Display Location Name in App
  const locationName = location.LocalizedName;
  UI.displayCurrentLocation(locationName);
  return key;
}


export default currentLocation;