const packingRules = [
    {
        test: weather =>
            ["Rain", "Drizzle", "Thunderstorm"].includes(weather.condition),
        items: [
            "☔ Pack an umbrella",
            "🧥 Waterproof jacket/raincoat",
            "🥾 Waterproof shoes/boots"
        ]
    },
    {
        test: weather =>
            weather.temp < 10,
        items: [
            "🧥 Heavy coat or parka",
            "🧣 Scarf & Gloves",
            "🧦 Warm wool socks"
        ]
    },
    {
        test: weather =>
            weather.temp >= 10 && weather.temp < 20,
        items: [
            "🧥 Light jacket, sweater, or hoodie",
            "👖 Long pants or jeans"
        ]
    },
    {
        test: weather =>
            weather.temp >= 20 && weather.temp <= 30,
        items: [
            "👕 T-shirts & light clothing",
            "👟 Comfortable sneakers or walking shoes"
        ]
    },
    {
        test: weather =>
            weather.temp > 30,
        items: [
            "🩳 Shorts & extremely light clothing",
            "🧴 Sunscreen (SPF 30+)",
            "🧢 Cap or sun hat"
        ]
    },
    {
        test: weather =>
            weather.humidity > 70,
        items: [
            "👕 Breathable or moisture-wicking fabrics",
            "💧 Extra bottle of water"
        ]
    },
    {
        test: weather =>
            weather.humidity < 30 && weather.humidity > 0,
        items: [
            "🧴 Moisturizer & lip balm"
        ]
    },
    {
        test: weather =>
            weather.condition === "Snow",
        items: [
            "🥾 Insulated winter boots",
            "🧣 Thermal wear"
        ]
    },
    {
        test: weather =>
            weather.condition === "Clear",
        items: [
            "🕶️ Sunglasses"
        ]
    },
    {
        test: weather =>
            weather.wind > 8,
        items: [
            "🧥 Windbreaker jacket"
        ]
    }
];

export function getPackingSuggestions(currentWeather) {
    const weather = {
        temp: currentWeather?.main?.temp ?? 15,
        humidity: currentWeather?.main?.humidity ?? 50,
        condition: currentWeather?.weather?.[0]?.main ?? "",
        wind: currentWeather?.wind?.speed ?? 0
    };

    const items = packingRules
        .filter(rule => rule.test(weather))
        .flatMap(rule => rule.items);

    // Deduplicate suggestions
    return [...new Set(items)];
}