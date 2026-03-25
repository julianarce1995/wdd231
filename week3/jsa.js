const apiKey = "76f7c319c5e67168b650d28b1dc4cb4b";
const lat = 49.75169458651316;
const lon = 6.635724219399802;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data?.main.temp}&deg;F`;
  const icon = `https://openweathermap.org/img/w/${data?.weather[0].icon}.png`;
  let desc = data?.weather[0].description;
  weatherIcon.setAttribute("src", icon);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = `${desc}`;
}

/*
  const url = "https://openweathermap.org/img/w/10d.png or https://openweathermap.org/img/wn";
  https://openweathermap.org/img/w/10d.png
  https://openweathermap.org/img/wn/10d@2x.png
  this version allows adjusting the size using @
  select HTML elements in the document
*/
