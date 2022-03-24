export {SERVER,
        favoriteCityList,
        form,
        likeIcon,
        tabs,
        errorDublicationCity,

    }

const SERVER = {
    URL: 'http://api.openweathermap.org/data/2.5/forecast',
    URL_ICONS: 'http://openweathermap.org/img/w/',
    API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
};

const favoriteCityList = document.querySelector('.main__list');
const form = document.getElementById('form');
const likeIcon = document.querySelector('.main__heart');
const tabs = document.querySelector('.main__box-tabs');
const errorDublicationCity = 'Город уже в избранном';