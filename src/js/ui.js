const app = document.getElementById('app');
const display = document.querySelector('.display');
const locationDisplay = document.getElementById('locationDisplay');
const weatherDisplay = document.getElementById('weatherDisplay');
const welcomeScreen = document.getElementById('welcomeScreen');
const detailsScreen = document.getElementById('detailsScreen');
const weatherDetails = document.getElementById('weatherDetails');
const forecastDetails = document.getElementById('forecastDetails');
const hoursBtn = document.getElementById('hoursBtn');
const daysBtn = document.getElementById('daysBtn');

class UI {

  static displayWarning() {
    locationDisplay.innerHTML = `<p>App doesn't have access to your location.
      <br>Please change your settings or choose location in search-box below.</p>`
  }

  static displayLocation(location) {
    locationDisplay.innerHTML = `<p>Weather in:<br>${location}</p>`
  }

  static displayWeather(weather) {
    const icon = weather.WeatherIcon < 10 ? `0${weather.WeatherIcon}`: weather.WeatherIcon;
    weatherDisplay.innerHTML =
    `<img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
    <p>${weather.ApparentTemperature.Metric.Value} °C<br>
    ${weather.WeatherText}</p>`;
  }

  static hideWelcomeScreen(){
    welcomeScreen.style.display = 'none';
  }

  static showWelcomeScreen(){
    welcomeScreen.style.display = 'flex';
  }

  static hideDetailsScreen(){
    detailsScreen.style.display = 'none';
  }

  static displayDetails(weather) {
    this.hideWelcomeScreen();
    detailsScreen.style.display = 'flex';
    weatherDetails.innerHTML = `
      <div>
        <h3>Temperature</h3>
        <p>actual: ${weather.Temperature.Metric.Value}°C
        <br>apparent: ${weather.ApparentTemperature.Metric.Value}°C</p>
      </div>
      <div>
        <h3>Precipitation</h3>
        <p>${weather.PrecipitationType || ''} ${weather.Precip1hr.Metric.Value}mm</p>
      </div>
      <div>
        <h3>Wind</h3>
        <p>direction: ${weather.Wind.Direction.English}
        <br>speed: ${weather.Wind.Speed.Metric.Value}km/h
        <br>gust: ${weather.WindGust.Speed.Metric.Value}km/h </p>
      </div>
      <div>
        <h3>Cloud Cover</h3>
        <p>${weather.CloudCover || 0}%</p>
        </div>
      <div>
        <h3>Pressure</h3>
        <p>${weather.Pressure.Metric.Value}mb ${weather.PressureTendency.LocalizedText}</p>
      </div>
      <div>
        <h3>Visibility</h3>
        <p>${weather.Visibility.Metric.Value}km</p>
      </div>
      <div>
        <h3>Ultraviolet Radiation</h3>
        <p>${weather.UVIndexText}</p>
      </div>`;
  }

  static displayForecastsMenu() {
    this.hideWelcomeScreen();
    hoursBtn.hidden = false;
    daysBtn.hidden = false;
    forecastsScreen.style.display = "flex";
    forecastDetails.style.display = "none";
  }

  static hideForecastsScreen(){
    forecastsScreen.style.display = "none";
    forecastDetails.innerHTML = '';
    forecastDetails.style.display = "none";
  }

  static hideButtons() {
    hoursBtn.hidden = true;
    daysBtn.hidden = true;
  }

  static displayHourlyForecast(forecast, hour) {
    this.hideButtons();
    forecastDetails.style.display = "block";
    const time = parseInt(forecast[hour].DateTime.slice(11, 13));
    const icon = forecast[hour].WeatherIcon < 10 ? `0${forecast[hour].WeatherIcon}`: forecast[hour].WeatherIcon;
    forecastDetails.innerHTML = `
      <nav class="nav-top">
        <button class="nav-btn prev" id="prevHourBtn">prev</button>
        <div id="hoursDisplay">${time}-${time+1}</div>
        <button class="nav-btn next" id="nextHourBtn">next</button>
      </nav>
      <img class="weatherIcon" src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
      <div class="phrase">
        <p>${forecast[hour].Temperature.Value}°C
        <br>${forecast[hour].IconPhrase}</p>
      </div>
      <div>
        <h3>Wind</h3>
        <p>direction: ${forecast[hour].Wind.Direction.English}
        <br>speed: ${forecast[hour].Wind.Speed.Value}km/h
        <br>gust: ${forecast[hour].WindGust.Speed.Value}km/h </p>
      </div>
      <div>
        <h3>Cloud Cover</h3>
        <p>${forecast[hour].CloudCover || 0}%</p>
      </div>
      <div>
        <h3>Rain</h3>
        <p>${forecast[hour].Rain.Value}mm
        <br>probability: ${forecast[hour].RainProbability}%</p>
      </div>
      <div>
        <h3>Snow</h3>
        <p>${forecast[hour].Snow.Value}cm
        <br>probability: ${forecast[hour].SnowProbability}%</p>
      </div>`;

    // TODO: allow and handle swipes
    if(hour < 11) {
      document.querySelector('#nextHourBtn').addEventListener('click', () => UI.displayHourlyForecast(forecast, hour+1));
    }
    if(hour > 0) {
      document.querySelector('#prevHourBtn').addEventListener('click', () => UI.displayHourlyForecast(forecast, hour-1));
    }
  }

  static displayDailyForecast(forecast, day, time) {
    this.hideButtons();
    forecastDetails.style.display = "block";
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = (new Date(forecast[day].Date)).getDay();
    const icon = forecast[day][time].Icon < 10 ? `0${forecast[day][time].Icon}`: forecast[day][time].Icon;
    forecastDetails.innerHTML = `
      <nav class="nav-top">
        <button class="nav-btn-d prev" id="prevDayBtn">prev</button>
        <div id="dayDisplay">${days[weekday]}</div>
        <button class="nav-btn-d next" id="nextDayBtn">next</button>
      </nav>
      <img class="weatherIcon" src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
      <div>
        <p>${forecast[day].Temperature.Minimum.Value} - ${forecast[day].Temperature.Maximum.Value}°C</p>
      </div>
      <div class="phrase">
        <p>${forecast[day][time].LongPhrase}</p>
      </div>
      <div>
        <h3>Wind</h3>
        <p>direction: ${forecast[day][time].Wind.Direction.English}
        <br>speed: ${forecast[day][time].Wind.Speed.Value}km/h
        <br>gust: ${forecast[day][time].WindGust.Speed.Value}km/h</p>
      </div>
      <div>
        <h3>Rain</h3>
        <p>${forecast[day][time].Rain.Value}mm
        <br>probability: ${forecast[day][time].RainProbability}%</p>
      </div>
      <div>
        <h3>Snow</h3>
        <p>${forecast[day][time].Snow.Value}cm
        <br>probability: ${forecast[day][time].SnowProbability}%</p>
      </div>
      <div class="make-space"></div>
      <nav class="nav-bottom">
        <button class="day-night-btn dayBtn" id="dayBtn">day</button>
        <button class="day-night-btn nightBtn" id="nightBtn">night</button>
      </nav>`;
    // higlight active button in bottom nav
    if(time === 'Day') {
      document.querySelector('#dayBtn').classList.add('active');
      document.querySelector('#nightBtn').classList.remove('active');
    } else {
      document.querySelector('#nightBtn').classList.add('active');
      document.querySelector('#dayBtn').classList.remove('active');
    }
    document.querySelector('#dayBtn').addEventListener('click', () => UI.displayDailyForecast(forecast, day, 'Day'));
    document.querySelector('#nightBtn').addEventListener('click', () => UI.displayDailyForecast(forecast, day, 'Night'));

    // TODO: allow and handle swipes
    if(day < 4) {
      document.querySelector('#nextDayBtn').addEventListener('click', () => UI.displayDailyForecast(forecast, day+1, time));
    }
    if(day > 0) {
      document.querySelector('#prevDayBtn').addEventListener('click', () => UI.displayDailyForecast(forecast, day-1, time));
    }
  }
}

export default UI;
