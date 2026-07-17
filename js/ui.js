import { convertTemperature, convertWind } from "./utils.js";

export function renderCurrentWeather(weather, unit = "metric") {

    const container = document.getElementById("currentWeather");

    container.innerHTML = `
        <h2>Current Weather</h2>

        <div class="current">

            <img
                src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"
                alt="${weather.weather[0].description}"
            >

            <div>

                <h3>${weather.name}</h3>

                <h1>${convertTemperature(weather.main.temp, unit)}${unit === "metric" ? "°C" : "°F"}</h1>

                <p>${weather.weather[0].main}</p>

                <p>Humidity: ${weather.main.humidity}%</p>

                <p>Wind: ${convertWind(weather.wind.speed, unit)} ${unit === "metric" ? "m/s" : "mph"}</p>

            </div>

        </div>
    `;
}

export function renderForecast(forecast, unit = "metric") {

    const container = document.getElementById("forecast");

    container.innerHTML = forecast.map(day => {
        const unitLabel = unit === "metric" ? "°C" : "°F";

        return `
            <div class="card">

                <h3>${day.date}</h3>

                <img
                    src="https://openweathermap.org/img/wn/${day.icon}@2x.png"
                    alt="${day.condition}"
                >

                <p>${day.condition}</p>

                <h2>↑ ${convertTemperature(day.max, unit)}${unitLabel}</h2>
                <p>↓ ${convertTemperature(day.min, unit)}${unitLabel}</p>

            </div>
        `;
    }).join("");

}
export function renderError(message) {

    const error = document.getElementById("error");

    error.textContent = message;

    error.classList.remove("hidden");

}
export function clearError() {

    document
        .getElementById("error")
        .classList.add("hidden");

}
export function showLoading() {

    document
        .getElementById("loading")
        .classList.remove("hidden");

}

export function hideLoading() {

    document
        .getElementById("loading")
        .classList.add("hidden");

}

export function renderPacking(items) {

    const container =
        document.getElementById("packingCard");

    if (items.length === 0) {

        container.innerHTML = `
            <h2>Packing Suggestions</h2>
            <p>No special recommendations.</p>
        `;

        return;
    }

    container.innerHTML = `
        <h2>Packing Suggestions</h2>

        <ul>

            ${items.map(item => `<li>${item}</li>`).join("")}

        </ul>
    `;
}