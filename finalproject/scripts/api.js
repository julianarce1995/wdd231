import { TMDB_API_KEY, TMDB_TRENDING_URL, TMDB_IMAGE_BASE } from "./config.js";

export async function fetchTrendingMovies() {
  if (!TMDB_API_KEY || TMDB_API_KEY === "") {
    return [];
  }

  try {
    const response = await fetch(
      `${TMDB_TRENDING_URL}?api_key=${TMDB_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    const data = await response.json();

    return (data.results).map((movie) => ({
      id: movie.id,
      source: "tmdb",
      title: movie.title,
      releaseDate: movie.release_date || "Unknown",
      rating: movie.vote_average
        ? `${movie.vote_average.toFixed(1)} / 10`
        : "No rating",
      genre: "Trending",
      runtime: "See details",
      synopsis: movie.overview || "No synopsis available.",
      trailerUrl: `https://www.themoviedb.org/movie/${movie.id}`,
      poster: movie.poster_path
        ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
        : "images/hero-pattern.svg",
    }));
  } catch (error) {
    console.error("Unable to fetch trending movies:", error);
    return [];
  }
}

export async function fetchLocalMovies() {
  try {
    const response = await fetch("data/movies.json");

    if (!response.ok) {
      throw new Error(`Local JSON request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Unable to fetch local movies:", error);
    return [];
  }
}

export function getRandomMovies(movies, count = 6) {
  const copied = [...movies];

  for (let i = copied.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }

  return copied.slice(0, count);
}
