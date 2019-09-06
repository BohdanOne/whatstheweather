import './styles/index.scss'
import { findCurrentLocation, searchLocation } from './js/getLocationKey';
import UI from './js/ui';

UI.renderWelcomeScreen();

findCurrentLocation();

document.querySelector('#searchInput').addEventListener('keyup', event => {
  searchLocation(event.which);
});