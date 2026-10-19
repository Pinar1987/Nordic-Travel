
const searchInput = document.querySelector("#searchInput");

const destinationCards = document.querySelectorAll(".destination-card");

const noResults = document.querySelector("#noResults");

const contactForm = document.querySelector("#contactForm");
const formSuccess = document.querySelector("#formSuccess");

const filterButtons = document.querySelectorAll(".filter-btn");

let activeCategory = "all";

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formSuccess.hidden = false;

});

function filterDestinations() {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    destinationCards.forEach(function (card) {
        const countryName = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = countryName.includes(searchText);
        const matchesCategory = activeCategory === "all" || category === activeCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleCards !== 0;
}

searchInput.addEventListener("input", filterDestinations);

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        activeCategory = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        filterDestinations();
    });
});
