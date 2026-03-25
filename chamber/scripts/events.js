const currentEvents = document.querySelector("#current-event");

function displayEvents(events) {
  currentEvents.innerHTML = "";

  events.forEach((event) => {
    const currentEvent = document.createElement("section");

    currentEvent.innerHTML = `
      <span>${event.title} -</span>
      <span>${event.date}</span>
    `;

    currentEvents.appendChild(currentEvent);
  });
}

async function loadEvents() {
  try {
    const response = await fetch("data/events.json");
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    displayEvents(data);
  } catch (error) {
    console.error("Error loading members:", error);
    currentEvents.innerHTML = "<p>Unable to load events at this time.</p>";
  }
}

loadEvents();
