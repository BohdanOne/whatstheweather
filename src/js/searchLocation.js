import axios from 'axios';
import UI from './ui';

const APIKEY = 'ErBJkb4Ssgqc7qlUq8IQgAd80X1eZqix';

const textSearchURL = `http://dataservice.accuweather.com/locations/v1/search`;



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

export default searchLocation;
