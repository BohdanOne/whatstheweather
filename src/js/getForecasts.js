import UI from './ui';
import axios from 'axios';

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

const hoursForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
const daysForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

export function getForecasts(key) {
  UI.displayForecastsMenu();
  // activate buttons
  // document.querySelector('#back').addEventListener('click', () => currentLocation('current'));
  document.querySelector('#hours').addEventListener('click', () => console.log('godzina')/*get12hoursForecast(key)*/);
  // document.querySelector('#days').addEventListener('click', () => get5daysForecast(key));
}