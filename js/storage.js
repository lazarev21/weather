import { getDataFromAPI } from "./main.js";
import { favoriteCityList } from "./consts.js"

export function updateFavoritelist () {
    const storageOfFavoriteCity = favoriteCityList.innerHTML
    localStorage.setItem('key', storageOfFavoriteCity);
}

export function saveCityNameOnStorage(cityName) {

    localStorage.setItem('cityFromStorage', cityName)
}

favoriteCityList.innerHTML = localStorage.getItem('key');
getDataFromAPI(localStorage.getItem('cityFromStorage'));