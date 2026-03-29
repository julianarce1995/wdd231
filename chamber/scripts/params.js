const params = new URLSearchParams(window.location.search);
const queryString = params.toString();

const paramsDiv = document.getElementById("params");

if (queryString) {
  paramsDiv.innerHTML = `
    <h2>Form Submission Details:</h2>
    <ul>
      ${[...params.entries()]
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join("")}
    </ul>
  `;
} else {
  paramsDiv.innerHTML = "<p>No form data received.</p>";
}
