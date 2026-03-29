const cards = document.querySelector("#cards");
const dialog = document.querySelector("#dialog");

document.addEventListener("DOMContentLoaded", () => {
  const timestamp = document.querySelector("#timestamp");
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }
});

function displayMembership(membership) {
  cards.innerHTML = "";

  membership.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-content">
        <h2>${member.title}</h2>
        <span>${member.description}</span>
        <button id="view-benefits-${member.id}" class="button">Additional information</button>
      </div>
    `;

    cards.appendChild(card);

    const button = card.querySelector(`#view-benefits-${member.id}`);
    button.addEventListener("click", () => {
      dialog.innerHTML = `
        <h2>${member.title} Benefits</h2>
        <span>Cost: $${member.cost}</span>
        <p>${member.description}</p>
        <h3>Benefits:</h3>
        <ul>
          ${member.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
        </ul>
        <button id="close-dialog" class="button">Close</button>
      `;
      dialog.showModal();

      const closeButton = dialog.querySelector("#close-dialog");
      closeButton.addEventListener("click", () => {
        dialog.close();
      });
    });
  });
}

async function loadMembers() {
  try {
    const response = await fetch("data/membership.json");
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    displayMembership(data);
  } catch (error) {
    console.error("Error loading membership data:", error);
    cards.innerHTML = "<p>Unable to load member directory at this time.</p>";
  }
}

loadMembers();
