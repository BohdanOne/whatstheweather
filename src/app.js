import './styles/index.scss';
import { welcomeScreen } from './js/welcomeScreen';

window.addEventListener('resize', () => {
  let vh = window.innerHeight * .01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

welcomeScreen();

