const btn = document.getElementById('get-forecast');
const select = document.getElementById('city-select');
const forecastContainer = document.getElementById('forecast-container');

const selectCity = () => {
    const city = select.value;
    if (!city) return;

    forecastContainer.innerHTML = `
    <img id="weather-icon">
    <div id="main-temperature"></div>
    <div id="feels-like"></div>
    <div id="humidity"></div>
    <div id="wind"></div>
    <div id="wind-gust"></div>
    <div id="weather-main"></div>
    <div id="location"></div>
    `

    showWeather(city);
}

const getWeather = async (city) => {
    try {
        let res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        if (!res.ok) {
            alert('Something went wrong, please try again later.');
        }
        let data = await res.json();

        return data;
    } catch (error) {
        alert('Something went wrong, please try again later.');
        console.error(error);
    }
}

const showWeather = async (city) => {
    const displayArr = Array.from(forecastContainer.children);
    const data = await getWeather(city);

    for (const el of displayArr) {
        if (el.id === 'weather-icon') {
            el.src = data.weather[0].icon;
            console.log(el);
        }
    }


    console.log();
}

btn.addEventListener('click', selectCity);