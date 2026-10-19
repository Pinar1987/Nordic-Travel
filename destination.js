const destinations = {
    norway: {
        name: "Norway", image: "images/norway.jpg", alt: "Norwegian fjord surrounded by mountains",
        description: "Dramatic fjords, mountain adventures and quiet moments by the water.",
        about: "Follow winding roads beside deep blue fjords, wander through waterfront cities and head north for Arctic landscapes. Norway invites you to slow down and spend time outdoors, whether you choose a gentle coastal walk or a mountain adventure.",
        capital: "Oslo", latitude: 59.91, longitude: 10.75, currency: "Norwegian krone · NOK", season: "June–August",
        places: [["Bergen", "Wander the historic Bryggen waterfront and take the funicular up Mount Fløyen."], ["Geirangerfjord", "Discover steep mountain walls and waterfalls from the water or a scenic viewpoint."], ["Lofoten Islands", "Explore fishing villages, white sand beaches and dramatic Arctic peaks."], ["Oslo", "Combine the harbour promenade with museums, parks and modern architecture."]],
        tips: [["When to go", "Summer brings long daylight hours. Winter offers snow adventures in suitable regions."], ["Getting around", "Combine trains, ferries and buses. Allow extra time for long distances and ferry connections."], ["What to pack", "Bring layers, waterproof outerwear and shoes with good grip, even in summer."], ["Plan your budget", "Check accommodation and transport prices early; grocery shops are useful for picnic supplies."]]
    },
    sweden: {
        name: "Sweden", image: "images/sweden.jpg", alt: "Snow-covered forest in Sweden",
        description: "Island cities, forest escapes and a little time for fika.",
        about: "Explore Stockholm's islands, enjoy the west coast's seaside towns or escape to forests and lakes. Sweden pairs lively design and food scenes with space to unwind. Pause for a coffee break and leave room in your itinerary for the outdoors.",
        capital: "Stockholm", latitude: 59.33, longitude: 18.06, currency: "Swedish krona · SEK", season: "June–August",
        places: [["Stockholm", "Walk through Gamla Stan and discover the capital's museums and island neighbourhoods."], ["Gothenburg", "Enjoy waterfront walks, cafés and a ferry trip into the southern archipelago."], ["Abisko", "Experience mountain scenery, hiking trails and Arctic winter nights."], ["Gotland", "Discover Visby's medieval streets and the island's distinctive limestone coast."]],
        tips: [["When to go", "Visit in summer for lakes and island trips, or winter for northern snow experiences."], ["Getting around", "Trains connect major cities. Check seasonal ferry schedules before island excursions."], ["What to pack", "Take layers and a rain jacket. In summer, insect repellent helps on forest and lake outings."], ["Make time for fika", "Enjoy a relaxed coffee and pastry break; check opening hours in smaller towns."]]
    },
    denmark: {
        name: "Denmark", image: "images/denmark.jpg", alt: "Colourful Copenhagen waterfront in Denmark",
        description: "Colourful harbours, coastal rides and everyday Danish charm.",
        about: "Discover colourful waterfronts, thoughtful design and relaxed seaside towns. Denmark's cities invite exploration on foot or by bike, while its islands and coast offer easy opportunities to slow down. Mix museums and cafés with a day by the sea.",
        capital: "Copenhagen", latitude: 55.67, longitude: 12.52, currency: "Danish krone · DKK", season: "May–September",
        places: [["Copenhagen", "Explore Nyhavn, harbour walks and the city's architecture and design scene."], ["Aarhus", "Discover art, lively neighbourhoods and the historic streets of Den Gamle By."], ["Odense", "Explore Hans Christian Andersen's hometown and its charming old streets."], ["Skagen", "Discover northern beaches, coastal light and the meeting seas at Grenen."]],
        tips: [["When to go", "Late spring through early autumn suits outdoor cafés, coastal walks and cycling."], ["Getting around", "Use trains between cities and local transport within them; follow local cycling rules."], ["What to pack", "Bring a windproof jacket and light layers for changeable coastal weather."], ["Book ahead", "Reserve popular attractions and accommodation early during summer and school holidays."]]
    },
    finland: {
        name: "Finland", image: "images/finland.jpg", alt: "Northern lights above a snowy forest in Finland",
        description: "Peaceful lakes, forest trails and a touch of northern magic.",
        about: "Find your own rhythm among Finland's forests and lakes, then explore Helsinki's waterfront and design scene. Summer offers long days outdoors, while northern winters invite snowy adventures. Leave time for a sauna and a quiet moment in nature.",
        capital: "Helsinki", latitude: 60.17, longitude: 24.93, currency: "Euro · EUR", season: "June–August",
        places: [["Helsinki", "Discover seaside neighbourhoods, design landmarks and the Suomenlinna sea fortress."], ["Finnish Lakeland", "Enjoy lake views, forest walks and the slower pace of waterside towns."], ["Rovaniemi", "Use this Arctic city as a starting point for seasonal Lapland adventures."], ["Turku Archipelago", "Explore coastal villages and island scenery by ferry, bike or road."]],
        tips: [["When to go", "Choose summer for lakes and trails, or northern winter for snow. Aurora sightings are never guaranteed."], ["Getting around", "Trains connect cities; check regional buses and island ferries for onward journeys."], ["What to pack", "Bring layers and rain protection in summer; proper insulated clothing is essential in winter."], ["Sauna etiquette", "Follow your host's guidance, shower first and take breaks whenever you need them."]]
    }
};
const country = new URLSearchParams(location.search).get("country");
const selected = Object.hasOwn(destinations, country) ? destinations[country] : null;
const byId = id => document.getElementById(id);
const weatherInfo = byId("weatherInfo");
const retry = byId("weatherRetry");
if (!selected) {
    document.title = "Destination not found | Nordic Travel";
    byId("destinationTitle").textContent = "Destination not found";
    byId("destinationDescription").textContent = "Use Back to Destinations to choose Norway, Sweden, Denmark or Finland.";
    byId("destinationImage").hidden = true;
    byId("destinationContent").hidden = true;
} else {
    document.title = `${selected.name} | Nordic Travel`;
    byId("destinationTitle").textContent = `Explore ${selected.name}`;
    byId("destinationImage").src = selected.image;
    byId("destinationImage").alt = selected.alt;
    byId("destinationDescription").textContent = selected.description;
    byId("aboutTitle").textContent = `About ${selected.name}`;
    byId("aboutDescription").textContent = selected.about;
    byId("weatherLocation").textContent = `${selected.capital} · Capital city conditions`;
    for (const [label, value] of [["Capital",selected.capital],["Currency",selected.currency],["Summer travel",selected.season]]) {
        const wrapper = document.createElement("div");
        const dt = document.createElement("dt"); dt.textContent = label;
        const dd = document.createElement("dd"); dd.textContent = value;
        wrapper.append(dt,dd); byId("countryFacts").append(wrapper);
    }
    function addCards(items, target, className) {
        items.forEach(([title, description], index) => {
            const card = document.createElement("article"); card.className = className;
            if (className === "place-card") {
                const number = document.createElement("span"); number.className = "place-number";
                number.textContent = String(index+1).padStart(2,"0"); number.setAttribute("aria-hidden","true"); card.append(number);
            }
            const heading = document.createElement("h3"); heading.textContent = title;
            const text = document.createElement("p"); text.textContent = description; card.append(heading,text);
            if (className === "place-card") {
                const link = document.createElement("a"); link.textContent = `Find ${title} on map ↗`;
                link.href = `https://www.openstreetmap.org/search?query=${encodeURIComponent(title+", "+selected.name)}`;
                link.target = "_blank"; link.rel = "noopener"; card.append(link);
            }
            byId(target).append(card);
        });
    }
    addCards(selected.places,"placesGrid","place-card");
    addCards(selected.tips,"tipsGrid","tip-card");
    retry.addEventListener("click",getWeather);
    getWeather();
}
function getWeatherDescription(code) {
    if (code === 0) return "Clear sky";
    if ([1,2,3].includes(code)) return "Partly cloudy / overcast";
    if ([45,48].includes(code)) return "Fog";
    if ([51,53,55,56,57].includes(code)) return "Drizzle";
    if ([61,63,65,66,67,80,81,82].includes(code)) return "Rain";
    if ([71,73,75,77,85,86].includes(code)) return "Snow";
    if ([95,96,99].includes(code)) return "Thunderstorm";
    return "Conditions unavailable";
}
async function getWeather() {
    retry.hidden = true; weatherInfo.textContent = "Loading weather…";
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(),12000);
    try {
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.search = new URLSearchParams({latitude:selected.latitude,longitude:selected.longitude,current:"temperature_2m,relative_humidity_2m,weather_code",timezone:"auto"});
        const response = await fetch(url,{signal:controller.signal});
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json(); const current = data.current;
        if (!current || !Number.isFinite(current.temperature_2m) || !Number.isFinite(current.weather_code) || typeof current.time !== "string") throw new Error("Incomplete weather data");
        const temperature = document.createElement("span"); temperature.className = "weather-temperature";
        temperature.textContent = `${Math.round(current.temperature_2m)} ${data.current_units?.temperature_2m || "°C"}`;
        const conditions = document.createElement("span"); conditions.textContent = getWeatherDescription(current.weather_code);
        const meta = document.createElement("span"); meta.className = "weather-meta";
        meta.textContent = `${Number.isFinite(current.relative_humidity_2m) ? `Humidity ${current.relative_humidity_2m}% · ` : ""}Updated ${current.time.replace("T"," ")} (${data.timezone || "local time"})`;
        weatherInfo.replaceChildren(temperature,conditions,meta);
    } catch {
        weatherInfo.textContent = "Weather is unavailable right now. Please try again.";
        retry.hidden = false;
    } finally { clearTimeout(timeout); }
}
