


const hoursForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
const daysForecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';



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

    // Display forecast in App
    UI.displayHoursForecast(forecast, 0)

  } catch(err) {
    console.log(err);
  }
};

async function get5daysForecast(key) {
  try {
    // Obtain forecast from AccuWeather API
    const forecast = await axios.get(`${daysForecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
      .then(res => res.data.DailyForecasts);

    // Display forecast in App
    UI.displayDaysForecast(forecast, 0)

  } catch(err) {
    console.log(err);
  }
};