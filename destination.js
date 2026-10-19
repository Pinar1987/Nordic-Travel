
const params = new URLSearchParams(window.location.search);
const country = params.get("country");

// Destination data
const destinations = {
    norway: {
        title: "Explore Norway",
        image: "images/norway.jpg",
        description: "Discover Norway's beautiful fjords.",
        capital: "Oslo",
        latitude: 59.91,
        longitude: 10.75
    },

    sweden: {
        title: "Explore Sweden",
        image: "images/sweden.jpg",
        description: "Explore Sweden's charming cities, forests and beautiful lakes.",
        capital: "Stockholm",
        latitude: 59.33,
        longitude: 18.06
    },

    denmark: {
        title: "Explore Denmark",
        image: "images/denmark.jpg",
        description: "Experience Denmark's colorful streets, historic castles and coastal beauty.",
        capital: "Copenhagen",
        latitude: 55.67,
        longitude: 12.52
    },

    finland: {
        title: "Explore Finland",
        image: "images/finland.jpg",
        description: "Discover Finland's peaceful lakes, forests and northern lights.",
        capital: "Helsinki",
        latitude: 60.17,
        longitude: 24.93
    }
};

// Select HTML elements
const destinationTitle = document.querySelector("#destinationTitle");
const destinationImage = document.querySelector("#destinationImage");
const destinationDescription = document.querySelector("#destinationDescription");
const weatherInfo = document.querySelector("#weatherInfo");

const selectedDestination = destinations[country];

// Display destination details
if (selectedDestination) {
    destinationTitle.textContent = selectedDestination.title;
    destinationImage.src = selectedDestination.image;
    destinationImage.alt = selectedDestination.title;
    destinationDescription.textContent = selectedDestination.description;

    getWeather();
} else {
    destinationTitle.textContent = "Destination not found";
    destinationImage.hidden = true;
    destinationDescription.textContent = "Please select a valid destination.";
    weatherInfo.textContent = "Weather information unavailable.";
}

// Convert weather codes into descriptions
function getWeatherDescription(code) {
    if (code === 0) {
        return "☀️ Clear sky";
    } else if (code >= 1 && code <= 3) {
        return "☁️ Cloudy";
    } else if (code === 45 || code === 48) {
        return "🌫️ Foggy";
    } else if (code >= 51 && code <= 67) {
        return "🌧️ Rainy";
    } else if (code >= 71 && code <= 86) {
        return "❄️ Snowy";
    } else if (code >= 95) {
        return "⛈️ Thunderstorm";
    } else {
        return "🌤️ Weather information unavailable";
    }
}

// Fetch current weather from Open-Meteo API
async function getWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${selectedDestination.latitude}&longitude=${selectedDestination.longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
        );

        if (!response.ok) {
            throw new Error("Weather data could not be loaded");
        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const weatherCode = data.current.weather_code;
        const description = getWeatherDescription(weatherCode);

        weatherInfo.textContent =
            `${selectedDestination.capital}: ${temperature}°C — ${description}`;

    } catch (error) {
        weatherInfo.textContent = "Unable to load weather data.";
        console.error(error);
    }
}
