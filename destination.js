const params = new URLSearchParams(window.location.search);
const country = params.get("country");

const destinations = {
    norway: {
        title: "Explore Norway",
        image: "images/norway.jpg",
        description: "Discover Norway's beautiful fjords, mountains and northern lights."
    },
    sweden: {
        title: "Explore Sweden",
        image: "images/sweden.jpg",
        description: "Explore Sweden's charming cities, forests and beautiful lakes."
    },
    denmark: {
        title: "Explore Denmark",
        image: "images/denmark.jpg",
        description: "Experience Denma's colorful streets, historic castles and coastal beauty."
    },
    finland: {
        title: "Explore Finland",
        image: "images/finland.jpg",
        description: "Discover Finland's peaceful lakes, forests and northern lights."
    }
};

const destinationTitle = document.querySelector("#destinationTitle");
const destinationImage = document.querySelector("#destinationImage");
const destinationDescription = document.querySelector("#destinationDescription");

const selectedDestination = destinations[country];

if (selectedDestination) {
    destinationTitle.textContent = selectedDestination.title;

    destinationImage.src = selectedDestination.image;
    destinationImage.alt = selectedDestination.title;

    destinationDescription.textContent = selectedDestination.description;
} else {
    destinationTitle.textContent = "Destination not found";
    destinationImage.hidden = true;
    destinationDescription.textContent = "Please select a valid destination.";
}