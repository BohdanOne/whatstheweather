import './styles/index.scss';
import { welcomeScreen } from './js/welcomeScreen';
// import AWLogo from './images/AW_logo.png';

window.addEventListener('resize', () => {
  let vh = window.innerHeight * .01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

welcomeScreen();

