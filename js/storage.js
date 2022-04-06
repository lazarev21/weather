import {SERVER} from "../js/consts.js"
import { getDataFromAPI } from "../js/main.js";

localStorage.setItem('cityFromStorage', SERVER.DEFAULT_CITY)

export function updateFavoritelist (favoriteCityStorage) {
    localStorage.setItem('key', favoriteCityStorage);
}

export function saveCityNameOnStorage(cityName) {
    localStorage.setItem('cityFromStorage', cityName)
}

document.querySelector('.main__list').innerHTML = localStorage.getItem('key');
getDataFromAPI(localStorage.getItem('cityFromStorage'));