import {SERVER,
  likeIcon,
  form,
  tabs,
} from "../js/consts.js";

import {activeTab,
  addFavoriteCity,
  dataOutputOnScreen,
} from "../js/view.js";

import {compareAsc, format} from "../node_modules/data-fns";

export let result = {};

form.addEventListener("submit", sendCityFromInput);
likeIcon.addEventListener("click", addFavoriteCity);

document.querySelector(".main__list").addEventListener("click", function(event) {
  const target = event.target;
  if (target.closest(".main__btn")) {
    const cityNameFromFavorite = target.innerText;
    getDataFromAPI(cityNameFromFavorite);
  }
});

tabs.addEventListener("click", function(event) {
  const target = event.target;
  if (target.closest(".tab-1")) {
    activeTab("first");
  }
  if (target.closest(".tab-2")) {
    activeTab("second");
  }
  if (target.closest(".tab-3")) {
    activeTab("third");
  }
});

function sendCityFromInput(event) {
  event.preventDefault();
  let cityNameFromInput = form.querySelector(".main__input").value;
  getDataFromAPI(cityNameFromInput);
  cityNameFromInput = "";
}

export function getDataFromAPI(cityName) {
  const url = `${SERVER.URL}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;
  console.log(url);

  fetch(url)
      .then((response) => response.json())
      .then((dataFromAPI) => {
        saveDataFromAPI(dataFromAPI);
      })
      .catch(alert);
}

function formateDate(date) {
  const MONTHS = ["January", "February", "Mart", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const dataFromApi = new Date(date*1000);
  const month = dataFromApi.getMonth();
  let day = dataFromApi.getDate();
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  return (`${day} ${MONTHS[month]}`);
}

function formateTime(date) {
  const dataFromApi = new Date(date*1000);
  let hours = dataFromApi.getHours();
  let minutes = dataFromApi.getMinutes();
  if (String(hours).length === 1) {
    hours = `0${hours}`;
  }
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }
  return (`${hours}:${minutes}`);
}

function saveDataFromAPI(dataFromAPI) {
  result = {
    city: dataFromAPI.city.name,
    temp: dataFromAPI.list[0].main.temp,
    feels_like: dataFromAPI.list[0].main.feels_like,
    weather: dataFromAPI.list[0].weather[0].main,
    sunrise: formateTime(dataFromAPI.city.sunrise),
    sunset: formateTime(dataFromAPI.city.sunset),
    icon: dataFromAPI.list[0].weather[0].icon,
    forecast: {
      "firstPeriod": {
        date: formateDate(dataFromAPI.list[0].dt),
        time: formateTime(dataFromAPI.list[0].dt),
        temp: dataFromAPI.list[0].main.temp,
        feels_like: dataFromAPI.list[0].main.feels_like,
        weather: dataFromAPI.list[0].weather[0].main,
        icon: dataFromAPI.list[0].weather[0].icon,
      },
      "secondPeriod": {
        date: formateDate(dataFromAPI.list[1].dt),
        time: formateTime(dataFromAPI.list[1].dt),
        temp: dataFromAPI.list[1].main.temp,
        feels_like: dataFromAPI.list[1].main.feels_like,
        weather: dataFromAPI.list[1].weather[0].main,
        icon: dataFromAPI.list[1].weather[0].icon,
      },
      "thirdPeriod": {
        date: formateDate(dataFromAPI.list[2].dt),
        time: formateTime(dataFromAPI.list[2].dt),
        temp: dataFromAPI.list[2].main.temp,
        feels_like: dataFromAPI.list[2].main.feels_like,
        weather: dataFromAPI.list[2].weather[0].main,
        icon: dataFromAPI.list[2].weather[0].icon,
      },
      "fourthPeriod": {
        date: formateDate(dataFromAPI.list[3].dt),
        time: formateTime(dataFromAPI.list[3].dt),
        temp: dataFromAPI.list[3].main.temp,
        feels_like: dataFromAPI.list[3].main.feels_like,
        weather: dataFromAPI.list[3].weather[0].main,
        icon: dataFromAPI.list[3].weather[0].icon,
      },
    },
  };
  dataOutputOnScreen(result);
}

