export default async function handler(req, res) {
    const { city, type } = req.query;

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "OpenWeather API key is not configured on the Vercel server. Please add it to your Environment Variables." });
    }

    if (!city) {
        return res.status(400).json({ error: "City parameter is required." });
    }

    const endpoint = type === "forecast" ? "forecast" : "weather";
    const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Pass along the response status and data
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data: " + error.message });
    }
}
