import UI from './ui';
import axios from 'axios';

const APIKEY = 'XgxIqRPGf7MbrzcLz0d8bvOrDmxV5uSo';
const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/';

export async function getCurrentWeather(key) {
  try {
    const currentWeather = await axios.get(`${currentURL}${key}?apikey=${APIKEY}&details=true`)
      .then(res => res.data[0]);

    UI.displayWeather(currentWeather);
    document.querySelector('#detailsBtn').addEventListener('click', () => {
      UI.displayDetails(currentWeather)
      document.querySelector('#backToWelcome').addEventListener('click', () => {
        UI.hideDetailsScreen();
        UI.showWelcomeScreen();
      });
    });

  } catch(err) {
    console.log(err);
  }
}
