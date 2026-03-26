const companySpotlights = document.querySelector("#company-spotlight");

function loadCompanySpotlights(data) {
  const random = [];
  for (let index = 0; index < 3; ) {
    const randomItem = data[Math.floor(Math.random() * data.length)];
    if (!random.includes(randomItem) && randomItem.membership > 1) {
      random.push(randomItem);
      index++;
    }
  }

  random.forEach((element) => {
    const spotlight = document.createElement("div");
    spotlight.innerHTML = `
    <div class="card-box">
      <span>Name: ${element.name}</span>
      <img src="images/${element.image}" alt="${element.name}" width="612" height="408" fetchpriority="high" />
      <span>Phone: ${element.phone}</span>
      <span>Address: ${element.address}</span>
      <span>Membership: ${element.membership == 2 ? "Silver" : "Gold"}</span>
    </div>
  `;

    companySpotlights.appendChild(spotlight);
  });
}

async function getMembers(params) {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    loadCompanySpotlights(data);
  } catch (error) {
    console.log(error);
  }
}

getMembers();

/*const spotlightContainer = document.querySelector(".spotlights");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const filtered = data.filter((member) => member.membership >= 2);

    const shuffled = filtered.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

//membership info
function getMembershipInfo(level) {
  if (level === 3) {
    return { text: "Gold Member", className: "gold-badge" };
  } else if (level === 2) {
    return { text: "Silver Member", className: "silver-badge" };
  } else {
    return { text: "Member", className: "member-badge" };
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "<h2>Business Spotlights</h2>";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("business");

    const membershipInfo = getMembershipInfo(member.membership);

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p><strong>Membership:</strong> <span class="membership-badge ${membershipInfo.className}">${membershipInfo.text}</span></p>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();
*/
