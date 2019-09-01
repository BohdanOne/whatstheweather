
class UI {
  static renderWelcomeScreen() {
    const app = document.getElementById('app');
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
      <p>${weather.ApparentTemperature.Metric.Value} ©C<br>
      ${weather.WeatherText}</p>`;
    console.log(weather);
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