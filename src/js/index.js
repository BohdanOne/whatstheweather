import axios from 'axios';

const locationURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
const forecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

async function getLocationKey() {
  try {
    if (navigator.geolocation) {
      let key = await navigator.geolocation.getCurrentPosition(getKey);
      console.log(key);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch(err) {
    console.log(err);
  }
}

async function getKey(position) {
  try {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const key = await axios.get(`${locationURL}?q=${lat},${long}&apikey=${APIKEY}`)
                  .then(res => res.data.Key)
    const forecast = await axios.get(`${forecastURL}${key}?apikey=${APIKEY}&metric=true&details=true`)
                      .then(res => res.data.DailyForecasts[0]);
    console.log(forecast);
  } catch(err) {
    console.log(err);
  }
}

export default getLocationKey;