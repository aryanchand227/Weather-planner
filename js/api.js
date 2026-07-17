import { API_KEY } from "./config.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

function ensureApiKey() {
    if (!API_KEY) {
        throw new Error("API key is missing. Create js/config.js from js/config.example.js and add your OpenWeatherMap API key.");
    }
}

export async function fetchCurrentWeather(city) {

    ensureApiKey();

    const url =
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather.");
    }

    return data;
}

export async function fetchForecast(city) {

    ensureApiKey();

    const url =
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch forecast.");
    }

    return data;
}