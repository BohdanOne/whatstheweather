import currentLocation from './currentLocation';
const app = document.getElementById('app');

class UI {
  static renderWelcomeScreen() {
    app.innerHTML = `
    <section id="display">
      <div id="locationDisplay" class="display-box"></div>
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

  static displayCurrentLocation(location) {
    const locationDisplay = document.querySelector('#locationDisplay');
    locationDisplay.innerHTML =
    `<p>You are in:<br>${location}</p>`
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

  // static displayForecast(forecast) {
  //   const display = document.querySelector('#display');
  //   const forecastDisplay = document.createElement('div');
  //   forecastDisplay.id = 'forecastDisplay';
  //   display.appendChild(forecastDisplay);
  //   const icon = forecast.Day.Icon < 10 ? `0${forecast.Day.Icon}`: forecast.Day.Icon;
  //   forecastDisplay.innerHTML =
  //     `<img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
  //     <p>${forecast.Temperature.Maximum.Value} &#8451;</p>
  //     <p>${forecast.Day.LongPhrase}</p>`
  //   console.log(forecast);
  // }
};

export default UI;