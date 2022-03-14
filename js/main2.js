const form = document.getElementById('form');
const like = document.querySelector('.main__heart');
const tabs = document.querySelector('.main__box-tabs');
const favoriteItem = document.querySelector('.main__list');
const SERVER_URL = 'http://api.openweathermap.org/data/2.5/forecast';
const SERVER_URL_ICONS = 'http://openweathermap.org/img/w/';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const errorCityDublication = 'Город уже в избранном';


form.addEventListener('submit', sendCityFromInput)
like.addEventListener('click', addFavoriteCity)

favoriteItem.addEventListener('click', function (event){
    let target = event.target;
    if (target.closest('.main__btn')){ 
        let cityNameFromFavorite = target.innerText;
        getDataFromAPI(cityNameFromFavorite);
    }
})

tabs.addEventListener('click', function (event) {
    let target = event.target;
    if (target.closest('.tab-1')){ 
        function activeTab(first)
    }
    if (target.closest('.tab-2')){ 
        function activeTab(second)
    }
    if (target.closest('.tab-3')){ 
        function activeTab(third)
    }
}) 


function sendCityFromInput (event) {
    event.preventDefault()
    let cityNameFromInput = form.querySelector('.main__input').value
    getDataFromAPI(cityNameFromInput)
    form.querySelector('.main__input').value = ''
}

function getDataFromAPI(cityName) {
    const url = `${SERVER_URL}?q=${cityName}&appid=${apiKey}&units=metric`;
    console.log(url)

    fetch(url)
    .then((response) => response.json())
    .then((item) => {
        saveDataFromAPI(item)
    })
    .catch(alert)

}

function addFavoriteCity () {
    const li = document.createElement('li')
    const node = document.querySelector('.main__list');
    const cityName = document.querySelector('.main__city').innerText;
    try { 
        for (let elem of node.children) {
            if (elem.outerText === cityName) {
                throw new Error (errorCityDublication)
            }

            li.className = `main__item`;
            li.innerHTML = `<button class="main__btn animation" type="button">${cityName}</button>`
            node.prepend(li)
        }
    }
    catch(e) {
        alert(e.message)
    }
}


function saveDataFromAPI (item) {
    let result = {
        city: item.city.name,
        temp: item.list[0].main.temp,
        feels_like: item.list[0].main.feels_like,
        weather: item.list[0].weather[0].main,
        sunrise: item.city.sunrise,
        sunset: item.city.sunset,
        icon: item.list[0].weather[0].icon,
        forecast: {
            firstPeriod: {
                date: item.list[0].dt,
                time: item.list[0].dt,
                temp: item.list[0].main.temp,
                feels_like: item.list[0].main.feels_like,
                weather: item.list[0].weather[0].main,
                icon: item.list[0].weather[0].icon,
            },
            secondPeriod: {
                date: item.list[1].dt,
                time: item.list[1].dt,
                temp: item.list[1].main.temp,
                feels_like: item.list[1].main.feels_like,
                weather: item.list[1].weather[0].main,
                icon: item.list[1].weather[0].icon,
            },
            thirdPeriod: {
                date: item.list[2].dt,
                time: item.list[2].dt,
                temp: item.list[2].main.temp,
                feels_like: item.list[2].main.feels_like,
                weather: item.list[2].weather[0].main,
                icon: item.list[2].weather[0].icon,
            },
            fourthPeriod: {
                date: item.list[3].dt,
                time: item.list[3].dt,
                temp: item.list[3].main.temp,
                feels_like: item.list[3].main.feels_like,
                weather: item.list[3].weather[0].main,
                icon: item.list[3].weather[0].icon,
            },
        
        }
    }
    dataOutputOnScreen(result)
}

function dataOutputOnScreen (result) {
        let node = document.querySelectorAll('.main__city')
        for (let elem of node) {
            elem.innerHTML = result.city;
        }
        console.log(result);

        document.querySelector('.temperature').innerText = result.temp;
        document.querySelector('.feels').innerText = result.feels_like;
        document.querySelector('.weather').innerText = result.weather;
        document.querySelector('.sunrise').innerText = result.sunrise;
        document.querySelector('.sunset').innerText = result.sunset;
        document.querySelector('.main__main-info').style[`background-image`] = (`url(${SERVER_URL_ICONS}${result.icon}.png)`);

        document.querySelector('.first-period_date').innerText = result.forecast.firstPeriod.date;
        document.querySelector('.first-period_time').innerText = result.forecast.firstPeriod.time;
        document.querySelector('.first-period_temperature').innerText = result.forecast.firstPeriod.temp;
        document.querySelector('.first-period_feels-like').innerText = result.forecast.firstPeriod.feels_like;
        document.querySelector('.first-period_weather').innerText = result.forecast.firstPeriod.weather;
        document.querySelector('.first-period_weather').style[`background-image`] = (`url(${SERVER_URL_ICONS}${result.forecast.firstPeriod.icon}.png)`);

        document.querySelector('.second-period_date').innerText = result.forecast.secondPeriod.date;
        document.querySelector('.second-period_time').innerText = result.forecast.secondPeriod.time;
        document.querySelector('.second-period_temperature').innerText = result.forecast.secondPeriod.temp;
        document.querySelector('.second-period_feels-like').innerText = result.forecast.secondPeriod.feels_like;
        document.querySelector('.second-period_weather').innerText = result.forecast.secondPeriod.weather;
        document.querySelector('.second-period_weather').style[`background-image`] = (`url(${SERVER_URL_ICONS}${result.forecast.secondPeriod.icon}.png)`);

        document.querySelector('.third-period_date').innerText = result.forecast.thirdPeriod.date;
        document.querySelector('.third-period_time').innerText = result.forecast.thirdPeriod.time;
        document.querySelector('.third-period_temperature').innerText = result.forecast.thirdPeriod.temp;
        document.querySelector('.third-period_feels-like').innerText = result.forecast.thirdPeriod.feels_like;
        document.querySelector('.third-period_weather').innerText = result.forecast.thirdPeriod.weather;
        document.querySelector('.third-period_weather').style[`background-image`] = (`url(${SERVER_URL_ICONS}${result.forecast.thirdPeriod.icon}.png)`);

        document.querySelector('.fourth-period_date').innerText = result.forecast.fourthPeriod.date;
        document.querySelector('.fourth-period_time').innerText = result.forecast.fourthPeriod.time;
        document.querySelector('.fourth-period_temperature').innerText = result.forecast.fourthPeriod.temp;
        document.querySelector('.fourth-period_feels-like').innerText = result.forecast.fourthPeriod.feels_like;
        document.querySelector('.fourth-period_weather').innerText = result.forecast.fourthPeriod.weather;
        document.querySelector('.fourth-period_weather').style[`background-image`] = (`url(${SERVER_URL_ICONS}${result.forecast.fourthPeriod.icon}.png)`);

    }








