import {form, 
        likeIcon, 
        tabs,
        favoriteCityList,
        activeTab,
        addFavoriteCity,
        dataOutputOnScreen,
        forecastByPeriod, 
    } from './view.js'

export const SERVER = {
    URL: 'http://api.openweathermap.org/data/2.5/forecast',
    URL_ICONS: 'http://openweathermap.org/img/w/',
    API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

export let result = {}

form.addEventListener('submit', sendCityFromInput)
likeIcon.addEventListener('click', addFavoriteCity)

favoriteCityList.addEventListener('click', function (event){
    let target = event.target;
    if (target.closest('.main__btn')){ 
        let cityNameFromFavorite = target.innerText;
        getDataFromAPI(cityNameFromFavorite);
    }
})

tabs.addEventListener('click', function (event) {
    let target = event.target;
    if (target.closest('.tab-1')){ 
        activeTab('first');
    }
    if (target.closest('.tab-2')){ 
        activeTab('second');
    }
    if (target.closest('.tab-3')){ 
        activeTab('third');
    }
})

function sendCityFromInput (event) {
    event.preventDefault();
    let cityNameFromInput = form.querySelector('.main__input').value;
    getDataFromAPI(cityNameFromInput);
    cityNameFromInput = '';
}

function getDataFromAPI(cityName) {
    const url = `${SERVER.URL}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;
    console.log(url)

    fetch(url)
    .then((response) => response.json())
    .then((dataFromAPI) => {
        saveDataFromAPI(dataFromAPI)
    })
    .catch(alert)

}

function saveDataFromAPI (dataFromAPI) {
    result = {
        city: dataFromAPI.city.name,
        temp: dataFromAPI.list[0].main.temp,
        feels_like: dataFromAPI.list[0].main.feels_like,
        weather: dataFromAPI.list[0].weather[0].main,
        sunrise: dataFromAPI.city.sunrise,
        sunset: dataFromAPI.city.sunset,
        icon: dataFromAPI.list[0].weather[0].icon,
        forecast: {
            'firstPeriod': {
                date: dataFromAPI.list[0].dt,
                time: dataFromAPI.list[0].dt,
                temp: dataFromAPI.list[0].main.temp,
                feels_like: dataFromAPI.list[0].main.feels_like,
                weather: dataFromAPI.list[0].weather[0].main,
                icon: dataFromAPI.list[0].weather[0].icon,
            },
            'secondPeriod': {
                date: dataFromAPI.list[1].dt,
                time: dataFromAPI.list[1].dt,
                temp: dataFromAPI.list[1].main.temp,
                feels_like: dataFromAPI.list[1].main.feels_like,
                weather: dataFromAPI.list[1].weather[0].main,
                icon: dataFromAPI.list[1].weather[0].icon,
            },
            'thirdPeriod': {
                date: dataFromAPI.list[2].dt,
                time: dataFromAPI.list[2].dt,
                temp: dataFromAPI.list[2].main.temp,
                feels_like: dataFromAPI.list[2].main.feels_like,
                weather: dataFromAPI.list[2].weather[0].main,
                icon: dataFromAPI.list[2].weather[0].icon,
            },
            'fourthPeriod': {
                date: dataFromAPI.list[3].dt,
                time: dataFromAPI.list[3].dt,
                temp: dataFromAPI.list[3].main.temp,
                feels_like: dataFromAPI.list[3].main.feels_like,
                weather: dataFromAPI.list[3].weather[0].main,
                icon: dataFromAPI.list[3].weather[0].icon,
            },
        }
    }
    dataOutputOnScreen(result)
}




