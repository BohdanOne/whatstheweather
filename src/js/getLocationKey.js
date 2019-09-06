import axios from 'axios';
// import currentLocation from './currentLocation';
import UI from './ui'

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

const textSearchURL = `http://dataservice.accuweather.com/locations/v1/search`;
const geopositionURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

// Location based on Geoposition

async function currentLocation(option) {
  try {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(getLocationKeyFromGeo);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch(err) {
    console.log(err);
  }
}

async function getLocationKeyFromGeo(position) {
  try {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const location = await axios.get(`${geopositionURL}?q=${lat},${long}&apikey=${APIKEY}`)
      .then(res => res.data);
    const key = location.Key;

    // Display Location Name in App
    const locationName = location.LocalizedName;
    UI.displayLocation(locationName);
    return key;
  } catch(err) {
    console.log(err);
  }
}

// Location Search basedon User Input

function searchLocation(key) {
  if(key === 13) {
    getLocationKeyFromInput(event.target.value);
  };
};

async function getLocationKeyFromInput(input) {
  try {
    const location = await axios.get(`${textSearchURL}?q=${input}&apikey=${APIKEY}`)
      .then(res => res.data[0]);
    const key = location.Key;
    const locationName = location.LocalizedName;
    UI.displayLocation(locationName);

    return key;
  } catch(err) {
    console.log(err);
  }
}

export { currentLocation, searchLocation };
