const app = document.getElementById('app');
const locationDisplay = document.querySelector('#locationDisplay');

class UI {
  static renderWelcomeScreen() {
    app.innerHTML = `
    <section id="display">
      <div id="locationDisplay" class="display-box">
        <p> Locating...</p>
        <div class="sp spinner"></div>
      </div>
    </section>
    <section id="buttons">
      <button class="btn" id="details">see details</button>
      <button class="btn" id="forecasts">check forecasts</button>
    </section>
    <section id="searchInput">
      <input type="text" name="city" id="cityInput" placeholder="search in other location">
    </section>
    `;
  }

  static displayLocation(location) {
    const locationDisplay = document.querySelector('#locationDisplay');
    locationDisplay.innerHTML =
    `<p>Weather in:<br>${location}</p>`
  }

  static displayWeather(weather) {
    const display = document.querySelector('#display');
    const weatherDisplay = document.createElement('div');
    weatherDisplay.id = 'weatherDisplay';
    weatherDisplay.classList.add('display-box');
    display.appendChild(weatherDisplay);
    const icon = weather.WeatherIcon < 10 ? `0${weather.WeatherIcon}`: weather.WeatherIcon;
    weatherDisplay.innerHTML =
    `<img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
    <p>${weather.ApparentTemperature.Metric.Value} °C<br>
    ${weather.WeatherText}</p>`;
  }

  static displayCurrentDetails(weather) {
    app.innerHTML = `
    <section id="display">
      <div id="weatherDetails" class="display-box"></div>
    </section>
    <section id="buttons">
      <button class="btn" id="back">go back</button>
    </section>
    `;
    const weatherDisplay = document.querySelector('#weatherDetails');
    const temperature = document.createElement('div');
    temperature.innerHTML = `
      <h3>Temperature</h3>
      <p>actual: ${weather.Temperature.Metric.Value} °C
      <br>apparent: ${weather.ApparentTemperature.Metric.Value} °C</p>`
    weatherDisplay.appendChild(temperature);
    const precip = document.createElement('div');
    precip.innerHTML = `
      <h3>Precipitation</h3>
      <p>${weather.PrecipitationType || ''} ${weather.Precip1hr.Metric.Value} mm</p>`
    weatherDisplay.appendChild(precip);
    const wind = document.createElement('div');
    wind.innerHTML = `
      <h3>Wind</h3>
      <p>direction: ${weather.Wind.Direction.English}
      <br>speed: ${weather.Wind.Speed.Metric.Value} km/h
      <br>gust: ${weather.WindGust.Speed.Metric.Value} km/h </p>`
    weatherDisplay.appendChild(wind);
    const cloud = document.createElement('div');
    cloud.innerHTML = `
      <h3>Cloud Cover</h3>
      <p>${weather.CloudCover || 0} %</p>`
    weatherDisplay.appendChild(cloud);
    const pressure = document.createElement('div');
    pressure.innerHTML = `
      <h3>Pressure</h3>
      <p>${weather.Pressure.Metric.Value} mb ${weather.PressureTendency.LocalizedText}</p>`
    weatherDisplay.appendChild(pressure);
    const visibility = document.createElement('div');
    visibility.innerHTML = `
      <h3>Visibility</h3>
      <p>${weather.Visibility.Metric.Value} km</p>`
    weatherDisplay.appendChild(visibility);
    const uv = document.createElement('div');
    uv.innerHTML = `
      <h3>Ultraviolet Radiation</h3>
      <p>${weather.UVIndexText}</p>`
    weatherDisplay.appendChild(uv);
    // activate 'go back' button
    document.querySelector('#back').addEventListener('click', () => currentLocation('current'));
  }

  static displayForecastsMenu() {
    app.innerHTML = `
    <section id="buttons">
      <button class="btn" id="hours">next 12 hours</button>
      <button class="btn" id="days">next 5 days</button>
      <button class="btn" id="back">go back</button>
    </section>
    `;
  }

  static displayHoursForecast(forecast, hour) {
    const time = parseInt(forecast[hour].DateTime.slice(11, 13));
    app.innerHTML = `
    <section id="display">
      <div id="weatherDetails" class="display-box">
        <nav class="top">
          <button class="nav-btn" id="prev">prev</button>
          <div id="hoursDisplay">${time}-${time+1}</div>
          <button class="nav-btn" id="next">next</button>
        </nav>
      </div>
    </section>
    <section id="buttons">
      <button class="btn" id="back">go back</button>
    </section>
    `;
    const forecastDisplay = document.querySelector('#weatherDetails');
    const icon = forecast[hour].WeatherIcon < 10 ? `0${forecast[hour].WeatherIcon}`: forecast[hour].WeatherIcon;
    const iconImg = document.createElement('img');
    iconImg.src = `https://developer.accuweather.com/sites/default/files/${icon}-s.png`;
    iconImg.style.paddingTop = '30px';
    forecastDisplay.appendChild(iconImg);
    const phrase = document.createElement('div');
    phrase.innerHTML = `
      <p>${forecast[hour].Temperature.Value} °C
      <br>${forecast[hour].IconPhrase}</p>`;
    phrase.style.fontSize = '1rem';
    phrase.firstElementChild.style.textTransform = 'none';
    phrase.style.paddingBottom = '30px';
    forecastDisplay.appendChild(phrase);
    const wind = document.createElement('div');
    wind.innerHTML = `
      <h3>Wind</h3>
      <p>direction: ${forecast[hour].Wind.Direction.English}
      <br>speed: ${forecast[hour].Wind.Speed.Value} km/h
      <br>gust: ${forecast[hour].WindGust.Speed.Value} km/h </p>`
    forecastDisplay.appendChild(wind);
    const cloud = document.createElement('div');
    cloud.innerHTML = `
      <h3>Cloud Cover</h3>
      <p>${forecast[hour].CloudCover || 0} %</p>`
    forecastDisplay.appendChild(cloud);
    const rain = document.createElement('div');
    rain.innerHTML = `
      <h3>Rain</h3>
      <p>${forecast[hour].Rain.Value} mm
      <br>probability: ${forecast[hour].RainProbability}</p>`
    forecastDisplay.appendChild(rain);
    const snow = document.createElement('div');
    snow.innerHTML = `
      <h3>Snow</h3>
      <p>${forecast[hour].Snow.Value} cm
      <br>probability: ${forecast[hour].SnowProbability}</p>`
    forecastDisplay.appendChild(snow);
    // activate buttons
    document.querySelector('#back').addEventListener('click', () => currentLocation('current'));
    // TODO: handle swipes
    if(hour < 11) {
      document.querySelector('#next').addEventListener('click', () => UI.displayHoursForecast(forecast, hour+1));
    }
    if(hour > 0) {
      document.querySelector('#prev').addEventListener('click', () => UI.displayHoursForecast(forecast, hour-1));
    }
  }

  static displayDaysForecast(forecast, day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = (new Date(forecast[day].Date)).getDay();
    app.innerHTML = `
    <section id="display">
      <div id="weatherDetails" class="display-box">
        <nav class="top">
          <button class="nav-btn-d" id="prev">prev</button>
          <div id="dayDisplay">${days[weekday]}</div>
          <button class="nav-btn-d" id="next">next</button>
        </nav>
        <img id="weatherIcon">
        <div id="temp">
          <p>${forecast[day].Temperature.Minimum.Value} - ${forecast[day].Temperature.Maximum.Value} °C</p>
        </div>
        <div id="phrase">
        </div>
        <div id="wind">
        </div>
        <div id="rain">
        </div>
        <div id="snow">
        </div>
        <nav class="bottom">
          <button class="day-night-btn" id="day">day</button>
          <button class="day-night-btn" id="night">night</button>
        </nav>
      </div>
    </section>
    <section id="buttons">
      <button class="btn" id="back">go back</button>
    </section>
    `;
    UI.displayDailyForecast(forecast[day], 'Day');
    // activate buttons
    document.querySelector('#back').addEventListener('click', () => currentLocation('current'));

    document.querySelector('#day').addEventListener('click', () => UI.displayDailyForecast(forecast[day], 'Day'));
    document.querySelector('#night').addEventListener('click', () => UI.displayDailyForecast(forecast[day], 'Night'));

    // TODO: handle swipes
    if(day < 4) {
      document.querySelector('#next').addEventListener('click', () => UI.displayDaysForecast(forecast, day+1));
    }
    if(day > 0) {
      document.querySelector('#prev').addEventListener('click', () => UI.displayDaysForecast(forecast, day-1));
    }
  }

  static displayDailyForecast(forecast, time) {
    // higlight button in bottom nav
    if(time === 'Day') {
      document.querySelector('#day').classList.add('active');
      document.querySelector('#night').classList.remove('active');
    } else {
      document.querySelector('#night').classList.add('active');
      document.querySelector('#day').classList.remove('active');
    }
    // display weather info
    const temperature = document.querySelector('#temp');
    temperature.firstElementChild.style.fontSize = '1rem';
    temperature.style.paddingBottom = '0';
    temperature.firstElementChild.style.textTransform = 'none';
    const icon = forecast[time].Icon < 10 ? `0${forecast[time].Icon}`: forecast[time].Icon;
    const weatherIcon = document.querySelector('#weatherIcon');
    weatherIcon.src = `https://developer.accuweather.com/sites/default/files/${icon}-s.png`;
    weatherIcon.style.paddingTop = '30px';
    const phrase = document.querySelector('#phrase');
    phrase.innerHTML = `<p>${forecast[time].LongPhrase}</p>`;
    phrase.style.fontSize = '.8rem';
    phrase.style.maxWidth = '220px';
    phrase.firstElementChild.style.textTransform = 'none';
    phrase.style.paddingBottom = '30px';
    const wind = document.querySelector('#wind');
    wind.innerHTML = `
      <h3>Wind</h3>
      <p>direction: ${forecast[time].Wind.Direction.English}
      <br>speed: ${forecast[time].Wind.Speed.Value} km/h
      <br>gust: ${forecast[time].WindGust.Speed.Value} km/h </p>`
    const rain = document.querySelector('#rain');
    rain.innerHTML = `
      <h3>Rain</h3>
      <p>${forecast[time].Rain.Value} mm
      <br>probability: ${forecast[time].RainProbability}</p>`
    const snow = document.querySelector('#snow');
    snow.innerHTML = `
      <h3>Snow</h3>
      <p>${forecast[time].Snow.Value} cm
      <br>probability: ${forecast[time].SnowProbability}</p>`
    snow.style.paddingBottom = '30px';
  }
};

export default UI;