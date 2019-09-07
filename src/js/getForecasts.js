import UI from './ui';
import axios from 'axios';

const APIKEY = 'XgxIqRPGf7MbrzcLz0d8bvOrDmxV5uSo';

const hoursForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
const daysForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

export function getForecasts(key) {
  UI.displayForecastsMenu();
  document.querySelector('#hoursBtn').addEventListener('click', () => getHourlyForecast(key));
  document.querySelector('#daysBtn').addEventListener('click', () => getDailyForecast(key));
  document.querySelector('#backBtn').addEventListener('click', () => {
    UI.hideForecastsScreen();
    UI.showWelcomeScreen();
  });
}

async function getHourlyForecast(key) {
  try {
    const forecast = await axios.get(`${hoursForecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
      .then(res => res.data);
    UI.displayHourlyForecast(forecast, 0)
  } catch(err) {
    console.log(err);
  }
};

async function getDailyForecast(key) {
  try {
    const forecast = await axios.get(`${daysForecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
      .then(res => res.data.DailyForecasts);
    UI.displayDailyForecast(forecast, 0, 'Day');

  } catch(err) {
    console.log(err);
  }
};