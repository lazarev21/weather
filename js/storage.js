import {SERVER} from "../js/consts.js";
import {getDataFromAPI} from "../js/main.js";
import Cookies from 'js-cookie';

localStorage.setItem("cityFromStorage", SERVER.DEFAULT_CITY);

export function updateFavoritelist(favoriteCityStorage) {
  localStorage.setItem("key", favoriteCityStorage);
}

/* export function saveCityNameOnStorage(cityName) {
    localStorage.setItem('cityFromStorage', cityName);
} */

export function saveCityNameOnCookie(cityName) {
    Cookies.set(`cityFromCookie`, `${cityName}`);
}

/* function getCookie() {
  return document.cookie.split("; ").reduce((acc, item) => {
    const [name, value] = item.split("=");

    return {...acc, [name]: value};
  }, {});
}
const cookie = getCookie();
document.cookie = "cityFromCookie"; */
// alert(Cookies.get('cityFromCookie'))

document.querySelector(".main__list").innerHTML = localStorage.getItem("key");
// getDataFromAPI(localStorage.getItem('cityFromStorage'));
let cityFromCookie = Cookies.get('cityFromCookie');
getDataFromAPI(cityFromCookie);




class Storage {

  constructor(names) {
      this.key = names
  }

  set(value) {
      localStorage.setItem(this.key, value)
  }

  get() {
      console.log(localStorage.getItem(this.key))
  }

  clear() {
      localStorage.removeItem(this.key)
  }

  isEmpty() {
      result = localStorage.getItem(this.key) ?? false
      if(result) {
          return true
      }
  }
}


new Storage ('ключ')