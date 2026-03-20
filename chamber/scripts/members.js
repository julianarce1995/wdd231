const cards = document.querySelector("#cards");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
cards.classList.add("grid-cards");

function setDisplayMode(mode) {
  if (mode === "grid") {
    cards.classList.add("grid-cards");
    cards.classList.remove("list");
    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
  } else {
    cards.classList.add("list");
    cards.classList.remove("grid-cards");
    gridButton.setAttribute("aria-pressed", "false");
    listButton.setAttribute("aria-pressed", "true");
  }
}

gridButton?.addEventListener("click", () => setDisplayMode("grid"));
listButton?.addEventListener("click", () => setDisplayMode("list"));

function membershipLabel(level) {
  switch (level) {
    case 3:
      return "Gold";
    case 2:
      return "Silver";
    default:
      return "Member";
  }
}

function displayMembers(members) {
  cards.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-content">
        <img class="card-image" src="${member.image ? `images/${member.image}` : "images/default.png"}" alt="${member.name} logo" loading="lazy" />
        <h2>${member.name}</h2>
        <p class="meta"><span>Category:</span> ${member.category || "N/A"}</p>
        <p class="description"><span>Description:</span> ${member.description || "No description available."}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
        <p><strong>Membership:</strong> ${membershipLabel(member.membership)}</p>
      </div>
    `;

    cards.appendChild(card);
  });
}

async function loadMembers() {
  try {
    const response = await fetch("scripts/data/members.json");
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error loading members:", error);
    cards.innerHTML = "<p>Unable to load member directory at this time.</p>";
  }
}

loadMembers();
