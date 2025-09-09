"use strict";

let currentPage = 1;
const size = 10;

// Invänta tills DOM är fullständigt laddad
document.addEventListener("DOMContentLoaded", () => {
    loadUpdates(1);
});

// Händelsehanterare som lyssnar när besökaren kommer till botten av sidan
window.addEventListener("scroll", () => {
    // Infinite scroll: Kontrollera om användaren nått botten av sidan
    // (synlig höjd + scroll-position >= total sidhöjd)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        currentPage++;
        loadUpdates(currentPage);
    }
});

// Ladda uppdateringar - antal sidor som parameter
function loadUpdates(page = 1) {
    // Url till API:et med sidnummer och antal per sida
    const url = `https://api.sr.se/api/v2/traffic/messages?format=json&page=${page}&size=${size}`;

    // Visa laddningsindikator
    document.getElementById("loading").style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            displayUpdates(data.messages);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
        .finally(() => {
            // Dölja laddningsindikator
            document.getElementById("loading").style.display = "none";
        });
}

// Uppdatera DOM med nya meddelanden
function displayUpdates(messages) {
    const container = document.getElementById("updates");
    messages.forEach(message => {
        const outputEl = document.createElement("article");
        outputEl.classList.add("update");
        outputEl.innerHTML = `
            <h3>${message.title} (${message.subcategory})</h3>
            <p>${message.description}</p>
        `;
        container.appendChild(outputEl);
    });
}