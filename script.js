
const searchInput = document.querySelector("#searchInput");

const destinationCards = document.querySelectorAll(".destination-card");

const noResults = document.querySelector("#noResults");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    destinationCards.forEach(function (card) {
        const countryName = card.querySelector("h3").textContent.toLowerCase();

        if (countryName.includes(searchText)) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCards !== 0;
});