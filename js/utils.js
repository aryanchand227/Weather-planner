export function processForecast(forecastData) {

    const dailyForecast = [];

    const seenDates = new Set();

    for (const item of forecastData.list) {

        const date = item.dt_txt.split(" ")[0];

        // Skip today's forecast
        const today = new Date().toISOString().split("T")[0];
        if (date === today) continue;

        // Take only one entry per day
        if (!seenDates.has(date)) {

            seenDates.add(date);

            dailyForecast.push({
                date,

                temp: item.main.temp,

                min: item.main.temp_min,

                max: item.main.temp_max,

                condition: item.weather[0].main,

                icon: item.weather[0].icon
            });

        }

        if (dailyForecast.length === 3) break;
    }

    return dailyForecast;
}

export function convertTemperature(temp, unit) {

    if (unit === "metric") {
        return Math.round(temp);
    }

    return Math.round((temp * 9 / 5) + 32);

}

export function convertWind(speed, unit) {

    if (unit === "metric") {
        return speed.toFixed(1);
    }

    return (speed * 2.237).toFixed(1);

}
