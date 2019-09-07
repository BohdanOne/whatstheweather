import UI from './ui';
import { findCurrentLocation, searchLocation , getLocationKey} from './getLocationKey';

export function welcomeScreen() {
  // Find current location via Geolocation API
  findCurrentLocation();

  // Activate text search for other locations
  document.querySelector('#searchInput').addEventListener('keyup', event => {
    searchLocation(event.which);
  });
  document.querySelector('#searchInput').addEventListener('change', event => {
    getLocationKey(event.target.value);
  });
}