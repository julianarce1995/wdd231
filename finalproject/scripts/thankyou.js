const params = new URLSearchParams(window.location.search);
const queryString = params.toString();

const paramsContainer = document.getElementById("params");

if (paramsContainer) {
  if (queryString) {
    paramsContainer.innerHTML = `
      <h1>Thank you for subscribing</h1>
      <p>We saved your preferences:</p>
      <ul>
        ${[...params.entries()]
          .map(([key, value]) => `<li><strong>${key}</strong>: ${value}</li>`)
          .join("")}
      </ul>
      <p><a class="button" href="index.html">Back to Home</a></p>
    `;
  } else {
    paramsContainer.innerHTML = `<p>No form data received.</p>`;
  }
}
