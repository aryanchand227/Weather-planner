const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function getLocalApiKey() {
    try {
        const config = await import("./config.js");
        return config.getApiKey();
    } catch (e) {
        return "";
    }
}

export async function fetchCurrentWeather(city) {
    try {
        // 1. Try Vercel Serverless Function Proxy
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&type=weather`);
        if (response.status !== 404) {
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Invalid API key. Please verify your OpenWeather API key in Vercel's Environment Variables.");
                }
                if (response.status === 404) {
                    throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
                }
                throw new Error(data.error || data.message || "Unable to fetch weather.");
            }
            return data;
        }
    } catch (error) {
        if (error.message && !error.message.includes("not found")) {
            throw error;
        }
    }

    // 2. Local Fallback (for local development)
    const apiKey = await getLocalApiKey();
    if (!apiKey) {
        throw new Error("API key is missing. Please configure OPENWEATHER_API_KEY in your Vercel Environment Variables, or create a local js/config.js file.");
    }

    const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
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
    try {
        // 1. Try Vercel Serverless Function Proxy
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&type=forecast`);
        if (response.status !== 404) {
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Invalid API key. Please verify your OpenWeather API key in Vercel's Environment Variables.");
                }
                if (response.status === 404) {
                    throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
                }
                throw new Error(data.error || data.message || "Unable to fetch forecast.");
            }
            return data;
        }
    } catch (error) {
        if (error.message && !error.message.includes("not found")) {
            throw error;
        }
    }

    // 2. Local Fallback (for local development)
    const apiKey = await getLocalApiKey();
    if (!apiKey) {
        throw new Error("API key is missing. Please configure OPENWEATHER_API_KEY in your Vercel Environment Variables, or create a local js/config.js file.");
    }

    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
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