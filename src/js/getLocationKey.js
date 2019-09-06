import axios from 'axios';
import UI from './ui'

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

const textSearchURL = `http://dataservice.accuweather.com/locations/v1/search`;
const geopositionURL = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

// Location based on Geoposition

async function findCurrentLocation(option) {
  try {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(position => {
        const latlong = `${position.coords.latitude},${position.coords.longitude}`;
        getLocationKeyGeo(latlong);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } catch(err) {
    console.log(err);
  }
};

async function getLocationKeyGeo(coords) {
  try {
    const location = await axios.get(`${geopositionURL}?q=${coords}&apikey=${APIKEY}`)
    .then(res => res.data);

    UI.displayLocation(location.LocalizedName);

    return location.Key;
  } catch(err) {
    console.log(err);
  }
}

// Location Search based on User Input

function searchLocation(key) {
  if(key === 13) {
    getLocationKey(event.target.value);
  };
};

async function getLocationKey(input) {
  try {
    const location = await axios.get(`${textSearchURL}?q=${input}&apikey=${APIKEY}`)
      .then(res => res.data[0]);
    if(location) {
      UI.displayLocation(location.LocalizedName);
      return location.Key;
    } else {
      UI.displayLocation('Place not found');
    }
  } catch(err) {
    console.log(err);
  }
}

export { findCurrentLocation, searchLocation };
