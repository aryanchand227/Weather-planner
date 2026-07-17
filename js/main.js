import { state } from "./state.js";
import { fetchCurrentWeather, fetchForecast } from "./api.js";
import { processForecast } from "./utils.js";
import {
    renderCurrentWeather,
    renderForecast,
    renderError,
    clearError,
    showLoading,
    hideLoading,
    renderPacking
} from "./ui.js";
import { getPackingSuggestions } from "./packing.js";
import { applyTheme } from "./theme.js";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const unitBtn = document.getElementById("unitBtn");

unitBtn.addEventListener("click", () => {

    state.unit =
        state.unit === "metric"
            ? "imperial"
            : "metric";

    unitBtn.textContent =
        state.unit === "metric"
            ? "°C"
            : "°F";

    if (state.current) {

        renderCurrentWeather(
            state.current,
            state.unit
        );

        renderForecast(
            state.forecast,
            state.unit
        );

    }

});
async function searchCity() {

    const city = cityInput.value.trim();

    if (!city) return;

    clearError();

    showLoading();

    try {
        const [current, forecast] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);

        state.city = city;
        state.current = current;
        state.forecast = processForecast(forecast);

        applyTheme(
            state.current.weather[0].main,
            state.current.main.temp
        );

        renderCurrentWeather(state.current, state.unit);
        renderForecast(state.forecast, state.unit);
        renderPacking(getPackingSuggestions(state.current));
    }
    catch (err) {

        renderError(err.message);

    }
    finally {

        hideLoading();

    }

}

searchBtn.addEventListener("click", searchCity);

cityInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        searchCity();

    }

});