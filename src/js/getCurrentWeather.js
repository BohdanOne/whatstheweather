import UI from './ui';
import axios from 'axios';

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';
const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/';

export async function getCurrentWeather(key) {
  try {
    const currentWeather = await axios.get(`${currentURL}${key}?apikey=${APIKEY}&details=true`)
      .then(res => res.data[0]);

    UI.displayWeather(currentWeather);
    document.querySelector('#detailsBtn').addEventListener('click', () => UI.displayDetails(currentWeather));

  } catch(err) {
    console.log(err);
  }
}
