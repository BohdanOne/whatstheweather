const display = document.getElementById('app');

class UI {
  static displayCurrentLocation(location) {
    const locationDisplay = document.querySelector('#locationDisplay');
    locationDisplay.innerHTML =
      `<p>You are in:</p>
      <p>${location}</p>`
  }

  static displayWeather(weather) {
    const weatherDisplay = document.createElement('div');
    display.appendChild(weatherDisplay);
    const icon = weather.WeatherIcon < 10 ? `0${weather.WeatherIcon}`: weather.WeatherIcon;
    weatherDisplay.innerHTML =
      `<img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
      <p>${weather.ApparentTemperature.Metric.Value} &#8451;</p>
      <p>${weather.WeatherText}</p>`;
    console.log(weather);
  }

  static displayForecast(forecast) {
    const forecastDisplay = document.createElement('div');
    display.appendChild(forecastDisplay);
    const icon = forecast.Day.Icon < 10 ? `0${forecast.Day.Icon}`: forecast.Day.Icon;
    forecastDisplay.innerHTML =
      `<img src="https://developer.accuweather.com/sites/default/files/${icon}-s.png">
      <p>${forecast.Temperature.Maximum.Value} &#8451;</p>
      <p>${forecast.Day.LongPhrase}</p>`
    console.log(forecast);
  }
};

export default UI;