import { items } from "../data/items.mjs";

const banner = document.getElementById("visit-banner");
const STORAGE_KEY = "discoverLastVisit";
const now = Date.now();
const last = localStorage.getItem(STORAGE_KEY);

if (!last) {
  banner.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffMs = now - Number(last);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    banner.textContent = "Back so soon! Awesome!";
  } else {
    const label = diffDays === 1 ? "day" : "days";
    banner.textContent = `You last visited ${diffDays} ${label} ago.`;
  }
}

localStorage.setItem(STORAGE_KEY, now);

const grid = document.getElementById("discover-grid");

items.forEach((item) => {
  const card = document.createElement("article");
  card.classList.add("discover-card");

  card.innerHTML = `
    <figure>
      <img
        src="${item.image}"
        alt="${item.alt}"
        width="300"
        height="200"
        loading="lazy"
      />
    </figure>
    <div class="discover-card-body">
      <h2>${item.name}</h2>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button class="button" type="button">Learn More</button>
    </div>
  `;

  grid.appendChild(card);
});
