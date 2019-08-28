import axios from 'axios';

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

const locationURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
const forecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';

const display = document.getElementById('app');

async function currentLocation() {
  try {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(getCurrentCondition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch(err) {
    console.log(err);
  }
}

async function getCurrentCondition(position) {
  try {
    // Obtain Location Key for AccuWeather API
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const location = await axios.get(`${locationURL}?q=${lat},${long}&apikey=${APIKEY}`)
      .then(res => res.data)
    const key = location.Key;
    // Display Location Name in App
    const locationName = location.LocalizedName;
    UI.displayCurrentLocation(locationName);


    // Obtain current weather condition from AccuWeather API
    const currentWeather = await axios.get(`${currentURL}${key}?apikey=${APIKEY}&details=true`)
      .then(res => res.data[0]);
    // console.log(currentWeather);

    // Display Current Weather in App
    UI.displayCurrentWeather(currentWeather);

    // const forecast = await axios.get(`${forecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
    //                   .then(res => res.data.DailyForecasts[0]);
    // console.log(forecast);

  } catch(err) {
    console.log(err);
  }
}

class UI {
  static displayCurrentLocation(location) {
    const locationDisplay = document.createElement('div');
    display.appendChild(locationDisplay);
    locationDisplay.innerHTML =
      `<p>Your current location:</p>
      <p>${location}</p> `
  }

  static displayCurrentWeather(weather) {
    const weatherDisplay = document.createElement('div');
    display.appendChild(weatherDisplay);
    const icon = weather.WeatherIcon < 10 ? `0${weather.WeatherIcon}`: weather.WeatherIcon;
    weatherDisplay.innerHTML =
      `<img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
      <p>${weather.ApparentTemperature.Metric.Value} &#8451;</p>`;
  }
}

export default currentLocation;