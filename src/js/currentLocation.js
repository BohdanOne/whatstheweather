import axios from 'axios';
import UI from './ui';

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

// AccuWeather API endpoints
const geopositionURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
const hoursForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
const daysForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

async function currentLocation(option) {
  try {
    UI.renderWelcomeScreen();
    const locationDisplay = document.querySelector('#locationDisplay');
    locationDisplay.innerHTML =
      `<p> Locating...</p>
      <div class="sp spinner"></div>`;
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

async function getCurrentWeather(position) {
  try {
    // Obtain LocationKey for AccuWeather API
    const key = await getLocationKeyFromGeo(position);

    // Obtain current weather condition from AccuWeather API
    const currentWeather = await axios.get(`${currentURL}${key}?apikey=${APIKEY}&details=true`)
      .then(res => res.data[0]);

    // Display Current Weather in App
    UI.displayWeather(currentWeather);

    // listen for clicks on buttons
    document.querySelector('#details').addEventListener('click', () => UI.displayCurrentDetails(currentWeather));
    document.querySelector('#forecasts').addEventListener('click', () => getForecasts(key));

  } catch(err) {
    console.log(err);
  }
}

function getForecasts(key) {
  UI.displayForecastsMenu();
  // activate buttons
  document.querySelector('#back').addEventListener('click', () => currentLocation('current'));
  document.querySelector('#hours').addEventListener('click', () => get12hoursForecast(key));
  document.querySelector('#days').addEventListener('click', () => get5daysForecast(key));
}

async function get12hoursForecast(key) {
  try {
    // Obtain forecast from AccuWeather API
    const forecast = await axios.get(`${hoursForecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
                      .then(res => res.data);
    console.log(forecast);

    // Display forecast in App
    // UI.displayHoursForecast(forecast)

  } catch(err) {
    console.log(err);
  }
};

async function get5daysForecast(key) {
  try {
    // Obtain forecast from AccuWeather API
    const forecast = await axios.get(`${daysForecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
                      .then(res => res.data);
    console.log(forecast);

    // Display forecast in App
    // UI.displayDaysForecast(forecast)

  } catch(err) {
    console.log(err);
  }
};

export default currentLocation;