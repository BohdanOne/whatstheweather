import UI from './ui'
import axios from 'axios';
import { getCurrentWeather } from './getCurrentWeather';
import { getForecasts } from './getForecasts';

const APIKEY = 'yxSLtFZXYf7f0otRwVvqKM3PZ5Ul3HJt';

const geopositionURL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
const textSearchURL = `https://dataservice.accuweather.com/locations/v1/search`;

// Location based on Geoposition

export async function findCurrentLocation(option) {
  try {
    if (navigator.geolocation) {
      // Find coordinates via Geoocation API
      await navigator.geolocation.getCurrentPosition(position => {
        const latlong = `${position.coords.latitude},${position.coords.longitude}`;
      // Push position to AccuWeather API or ask user to allow geolocation
        getLocationKeyGeo(latlong);
      }, () => UI.displayWarning());
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch(err) {
    console.log(err);
  }
}

async function getLocationKeyGeo(coords) {
  try {
    // Obtain location key from AccuWeather API
    const location = await axios.get(`${geopositionURL}?q=${coords}&apikey=${APIKEY}`)
      .then(res => res.data);
    // Display actual location and current weather conditions
    UI.displayLocation(location.LocalizedName);
    getCurrentWeather(location.Key);
    // Activate button to access forecasts for current location
    document.getElementById('forecastsBtn').addEventListener('click', () => getForecasts(location.Key))
  } catch(err) {
    console.log(err);
  }
}

// Location Search based on User Input

export function searchLocation(key) {
  if(key === 13) {
    getLocationKey(event.target.value);
  }
}

export async function getLocationKey(input) {
  try {
    // Obtain location key from AccuWeather API
    const location = await axios.get(`${textSearchURL}?q=${input}&apikey=${APIKEY}`)
      .then(res => res.data[0]);
    if(location) {
    // Display chosen location and current weather conditions
      UI.displayLocation(location.LocalizedName);
      getCurrentWeather(location.Key);
    // Activate button to access forecasts for chosen location
      document.getElementById('forecastsBtn').addEventListener('click', () => getForecasts(location.Key));
    } else {
      UI.displayLocation('Place not found');
    }
  } catch(err) {
    console.log(err);
  }
}