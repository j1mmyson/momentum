const API_KEY = "dd61c93556a8912b4d1d66fca8ac8039";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weatherIcon = document.querySelector(".icon");
const weather = document.querySelector(".js-weather .weather_text");

function getWeather(coords) {
    fetch(
        `${WEATHER_API}lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=metric`
    )
    .then(response => response.json())
    .then(json => {
        console.log(json);
        const name = json.name;
        const temperature = json.main.temp;
        const icon = json.weather[0].icon;
        const imSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.src = imSrc;
        weather.innerText = `${name} , ${Math.floor(temperature)}°`;
    });
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coords = {
        lat,
        lng
    };
    localStorage.setItem("coords", JSON.stringify(coords));
    getWeather(coords);
}

function handleGeoFailure() {
    console.log("no location");
}

function loadWeather() {
    const currentCoords = localStorage.getItem("coords");
    if (currentCoords !== null) {
        const parsedCoords = JSON.parse(currentCoords);
        getWeather(parsedCoords);
        return;
    }else {
        navigator.geolocation.getCurrentPosition(
        handleGeoSuccess,
        handleGeoFailure
    );
    }
}

function init() {
    loadWeather();
}

init();