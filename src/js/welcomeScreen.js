import UI from './ui';
import { findCurrentLocation, searchLocation , getLocationKey} from './getLocationKey';

export function welcomeScreen() {
  findCurrentLocation();

  document.querySelector('#searchInput').addEventListener('keyup', event => {
    searchLocation(event.which);
  });
  document.querySelector('#searchInput').addEventListener('change', event => {
    getLocationKey(event.target.value);
  });

  // document.querySelector('#forecasts').addEventListener('click', () => getForecasts());
}




