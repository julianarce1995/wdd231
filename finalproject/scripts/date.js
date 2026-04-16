const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.textContent = `${today.getFullYear()}`;

const lastModified = document.querySelector("#lastModified");
const nLastModif = document.lastModified;
lastModified.innerHTML = `last modification: ${nLastModif.toLocaleString()}`;
