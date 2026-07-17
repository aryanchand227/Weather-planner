const packingRules = [

    {
        test: weather =>
            ["Rain", "Drizzle", "Thunderstorm"].includes(weather.condition),

        items: [
            "☔ Pack an umbrella",
            "🧥 Waterproof jacket"
        ]
    },

    {
        test: weather =>
            weather.temp < 10,

        items: [
            "🧥 Heavy coat",
            "🧤 Gloves"
        ]
    },

    {
        test: weather =>
            weather.temp > 30,

        items: [
            "🩳 Light clothing",
            "🧴 Sunscreen"
        ]
    },

    {
        test: weather =>
            weather.humidity > 70,

        items: [
            "👕 Breathable fabrics"
        ]
    },

    {
        test: weather =>
            weather.condition === "Snow",

        items: [
            "🥾 Waterproof boots"
        ]
    }

];


export function getPackingSuggestions(currentWeather) {

    const weather = {

        temp: currentWeather.main.temp,

        humidity: currentWeather.main.humidity,

        condition: currentWeather.weather[0].main

    };

    return packingRules

        .filter(rule => rule.test(weather))

        .flatMap(rule => rule.items);

}