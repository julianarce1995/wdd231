import {
  fetchTrendingMovies,
  fetchLocalMovies,
  getRandomMovies,
} from "./api.js";
import { renderMovies } from "./ui.js";

const trendingContainer = document.querySelector("#trending-grid");
const statusBox = document.querySelector("#status-box");

async function initHome() {
  if (!trendingContainer || !statusBox) {
    return;
  }

  const trending = await fetchTrendingMovies();
  let sourceLabel = "TMDB trending API";
  let movies = trending;

  if (!trending.length) {
    const localMovies = await fetchLocalMovies();
    movies = localMovies.map((movie) => ({ ...movie, source: "local" }));
    sourceLabel = "local fallback JSON";
  }

  const randomSelection = getRandomMovies(movies, 6);
  renderMovies(trendingContainer, randomSelection);
  statusBox.textContent = `Now showing data from ${sourceLabel}. Cards are randomized on each page load.`;
}

initHome();
