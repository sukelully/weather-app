const btn = document.getElementById('get-forecast');
const select = document.getElementById('city-select');
const forecastContainer = document.getElementById('forecast-container');

const selectCity = () => {
    const city = select.value;
    if (!city) return;

    forecastContainer.innerHTML = `
    <div id="location"></div>
    <div id="main-temperature"></div>
    <img id="weather-icon">
    <div id="weather-main"></div>
    <div id="humidity"></div>
    <div id="feels-like"></div>
    <div id="wind"></div>
    <div id="wind-gust"></div>
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

    if (!data) {
        alert('Weather data could not be retrieved.');
        return;
    }

    for (const el of displayArr) {
        switch (el.id) {
            case 'weather-icon':
                el.src = data.weather?.[0]?.icon || ''; // Handle undefined icons
                el.alt = data.weather?.[0]?.description || 'No icon available';
                break;
            case 'main-temperature':
                el.textContent = data.main?.temp !== undefined ? `${data.main.temp}° C` : 'N/A';
                break;
            case 'feels-like':
                el.textContent = data.main?.feels_like !== undefined ? `${data.main.feels_like}° C` : 'N/A';
                break;
            case 'humidity':
                el.textContent = data.main?.humidity !== undefined ? `${data.main.humidity}%` : 'N/A';
                break;
            case 'wind':
                el.textContent = data.wind?.speed !== undefined ? `${data.wind.speed} m/s` : 'N/A';
                break;
            case 'wind-gust':
                el.textContent = data.wind?.gust !== undefined ? `${data.wind.gust} m/s` : 'N/A';
                break;
            case 'weather-main':
                el.textContent = data.weather?.[0]?.description || 'N/A';
                break;
            case 'location':
                el.textContent = data.name || 'N/A';
                break;
            default:
                el.textContent = 'N/A';
                break;
        }
    }
};


btn.addEventListener('click', selectCity);

// selectCity();