import UI from './ui';
import axios from 'axios';

const APIKEY = 'yxSLtFZXYf7f0otRwVvqKM3PZ5Ul3HJt';
const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/';

export async function getCurrentWeather(key) {
  try {
    // Get current weather condition from AccuWeather API
    const currentWeather = await axios.get(`${currentURL}${key}?apikey=${APIKEY}&details=true`)
      .then(res => res.data[0]);
    // Display basic info
    UI.displayWeather(currentWeather);
    // Activate access to detailed info
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
