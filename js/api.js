import { getApiKey } from "./config.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

function ensureApiKey() {
    const key = getApiKey();

    if (!key) {
        throw new Error("API key is missing. Enter it above or create js/config.js from js/config.example.js and add your OpenWeatherMap API key.");
    }

    return key;
}

export async function fetchCurrentWeather(city) {

    const apiKey = ensureApiKey();

    const url =
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid API key. Please check your OpenWeather API key. If you just created it, it can take up to 2 hours to activate.");
        }
        if (response.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
        }
        throw new Error(data.message || "Unable to fetch weather.");
    }

    return data;
}

export async function fetchForecast(city) {

    const apiKey = ensureApiKey();

    const url =
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid API key. Please check your OpenWeather API key. If you just created it, it can take up to 2 hours to activate.");
        }
        if (response.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
        }
        throw new Error(data.message || "Unable to fetch forecast.");
    }

    return data;
}