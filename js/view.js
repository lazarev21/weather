import {SERVER,
        errorDublicationCity,
    
    } from '../js/consts.js'

import {result} from '../js/main.js'

import { saveCityNameOnStorage, updateFavoritelist } from './storage.js';

export {activeTab,
        addFavoriteCity,
        dataOutputOnScreen,
    }; 

function activeTab(numberOfTab) {
    if (numberOfTab === 'first') {
        document.getElementById('tab-1').classList.add('main__info--active')
        document.getElementById('tab-2').classList.remove('main__info--active')
        document.getElementById('tab-3').classList.remove('main__info--active')
    }

    if (numberOfTab === 'second') { 
        document.getElementById('tab-1').classList.remove('main__info--active')
        document.getElementById('tab-2').classList.add('main__info--active')
        document.getElementById('tab-3').classList.remove('main__info--active')
    }

    if (numberOfTab === 'third') {
        document.getElementById('tab-1').classList.remove('main__info--active')
        document.getElementById('tab-2').classList.remove('main__info--active')
        document.getElementById('tab-3').classList.add('main__info--active')
    }
}   

function addFavoriteCity () {
    let favoriteCityList = document.querySelector('.main__list')
    const li = document.createElement('li');
    const cityName = document.querySelector('.main__city').innerText;
    try { 
        for (let elem of favoriteCityList.children) {
            if (elem.outerText === cityName) {
                throw new Error (errorDublicationCity)
            }
            li.className = `main__item`;
            li.innerHTML = `<button class="main__btn animation" type="button">${cityName}</button>`
            favoriteCityList.prepend(li)
        }
    }
    catch(error) {
        alert(error.message)
    }
    let favoriteCityStorage = favoriteCityList.innerHTML
    updateFavoritelist(favoriteCityStorage)
}

function dataOutputOnScreen (result) {
    let node = document.querySelectorAll('.main__city');
    for (let elem of node) {
        elem.innerHTML = result.city;
    }
    console.log(result);
    document.querySelector('.temperature').innerText = result.temp;
    document.querySelector('.temperature_details').innerText = result.temp;
    document.querySelector('.feels').innerText = result.feels_like;
    document.querySelector('.weather').innerText = result.weather;
    document.querySelector('.sunrise').innerText = result.sunrise;
    document.querySelector('.sunset').innerText = result.sunset;
    document.querySelector('.main__main-info').style[`background-image`] = (`url(${SERVER.URL_ICONS}${result.icon}.png)`);
    
    forecastByPeriod('firstPeriod');
    forecastByPeriod('secondPeriod');
    forecastByPeriod('thirdPeriod');
    forecastByPeriod('fourthPeriod');

    let cityName = document.querySelector('.main__city').innerText;
    saveCityNameOnStorage(cityName)

}

function forecastByPeriod (period) {
document.querySelector(`.${period}_date`).innerText = result.forecast[period].date;
document.querySelector(`.${period}_time`).innerText = result.forecast[period].time;
document.querySelector(`.${period}_temperature`).innerText = Math.round(result.forecast[period].temp);
document.querySelector(`.${period}_feels-like`).innerText =  Math.round(result.forecast[period].feels_like);
document.querySelector(`.${period}_weather`).innerText = result.forecast[period].weather;
document.querySelector(`.${period}_weather`).style[`background-image`] = (`url(${SERVER.URL_ICONS}${result.forecast[period].icon}.png)`);
}




