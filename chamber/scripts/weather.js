const apiKey = "76f7c319c5e67168b650d28b1dc4cb4b";
const lat = 49.75169458651316;
const lon = 6.635724219399802;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const weatherSection = document.querySelector("#weather-section");
const weatherForecastSection = document.querySelector("#weather-forecast");

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function apiFetchForecast() {
  try {
    const responseForecast = await fetch(urlForecast);
    if (responseForecast.ok) {
      const forecastData = await responseForecast.json();
      displayForecastResults(forecastData);
    } else {
      throw Error(await responseForecast.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();
apiFetchForecast();

function displayResults(data) {
  weatherSection.innerHTML = `
    <span>Temperature: ${data?.main.temp}&deg;F</span>
    <span>Humidity: ${data?.main.humidity}%</span>
    <span>Description: ${data?.weather[0].description}</span>
  `;
}

function displayForecastResults(forecastData) {
  const filtered = forecastData.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  weatherForecastSection.innerHTML = `
    <span>Wed: ${filtered[0].main.temp}&deg;C</span>
    <span>Thurs: ${filtered[1].main.temp}&deg;C</span>
    <span>Friday: ${filtered[2].main.temp}&deg;C</span>
  `;
}
