import './styles/index.scss'
import { currentLocation, searchLocation } from './js/getLocationKey';
import UI from './js/ui';

UI.renderWelcomeScreen();

currentLocation();

document.querySelector('#searchInput').addEventListener('keyup', event => {
  searchLocation(event.which);
});