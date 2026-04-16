import { fetchLocalMovies } from "./api.js";
import { renderMovies } from "./ui.js";

const visitBanner = document.getElementById("visit-banner");
const discoverGrid = document.getElementById("discover-grid");
const genreFilter = document.getElementById("genre-filter");
const STORAGE_LAST_VISIT = "movieHubLastVisit";
const STORAGE_GENRE = "movieHubGenreFilter";

function updateVisitBanner() {
  if (!visitBanner) {
    return;
  }

  const now = Date.now();
  const lastVisit = Number(localStorage.getItem(STORAGE_LAST_VISIT));

  if (!lastVisit) {
    visitBanner.textContent = "Welcome! Explore local movie recommendations.";
  } else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    visitBanner.textContent =
      diffDays < 1
        ? "Welcome back! Check out new movie recommendations."
        : `Your last visit was ${diffDays} day${diffDays === 1 ? "" : "s"} ago.`;
  }

  localStorage.setItem(STORAGE_LAST_VISIT, now.toString());
}

function filterMoviesByGenre(movies, selectedGenre) {
  if (selectedGenre === "all") {
    return movies;
  }

  return movies.filter(
    (movie) => movie.genre.toLowerCase() === selectedGenre.toLowerCase(),
  );
}

async function initDiscover() {
  if (!discoverGrid || !genreFilter) {
    return;
  }

  updateVisitBanner();

  const movies = (await fetchLocalMovies()).map((movie) => ({
    ...movie,
    source: "local",
  }));
  const allGenres = [...new Set(movies.map((movie) => movie.genre))].sort();

  allGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });

  const savedGenre = localStorage.getItem(STORAGE_GENRE) || "all";
  genreFilter.value = savedGenre;
  renderMovies(discoverGrid, filterMoviesByGenre(movies, savedGenre));

  genreFilter.addEventListener("change", () => {
    const selected = genreFilter.value;
    localStorage.setItem(STORAGE_GENRE, selected);
    renderMovies(discoverGrid, filterMoviesByGenre(movies, selected));
  });
}

initDiscover();
