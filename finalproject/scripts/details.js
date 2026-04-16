import { fetchLocalMovies, fetchTrendingMovies } from "./api.js";

const SELECTED_MOVIE_KEY = "selectedMovie";
const detailsContainer = document.getElementById("details-container");
const movieDialog = document.getElementById("movie-dialog");
const openModalButton = document.getElementById("open-modal");

function renderDetails(movie) {
  if (!detailsContainer) {
    return;
  }

  detailsContainer.innerHTML = `
    <article class="details-card details-layout">
      <div class="details-media">
        <img
          src="${movie.poster}"
          alt="Poster of ${movie.title}"
          width="500"
          height="750"
          loading="lazy"
        />
      </div>
      <div class="details-body">
        <h1>${movie.title}</h1>
        <p><strong>Release date:</strong> ${movie.releaseDate}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Runtime:</strong> ${movie.runtime}</p>
        <p><strong>Director:</strong> ${movie.director || "Not provided"}</p>
        <p>${movie.synopsis}</p>
      </div>
    </article>
  `;
}

function setupDialog(movie) {
  if (!movieDialog || !openModalButton) {
    return;
  }

  openModalButton.addEventListener("click", () => {
    movieDialog.innerHTML = `
      <div class="dialog-content">
        <h2>Trailer and extra notes</h2>
        <p>This opens your trailer source in a new tab:</p>
        <p><a href="${movie.trailerUrl}" target="_blank" rel="noopener">Open trailer for ${movie.title}</a></p>
        <p>${movie.synopsis}</p>
        <div class="dialog-actions">
          <button type="button" id="close-modal" class="button">Close</button>
        </div>
      </div>
    `;

    movieDialog.showModal();

    const closeBtn = movieDialog.querySelector("#close-modal");
    closeBtn?.addEventListener("click", () => movieDialog.close());
  });

  movieDialog.addEventListener("cancel", () => movieDialog.close());
}

async function initDetails() {
  const selectedMovieRaw = localStorage.getItem(SELECTED_MOVIE_KEY);

  if (selectedMovieRaw) {
    try {
      const selectedMovie = JSON.parse(selectedMovieRaw);

      if (selectedMovie?.id && selectedMovie?.title) {
        renderDetails(selectedMovie);
        setupDialog(selectedMovie);
        return;
      }
    } catch (error) {
      console.error("Unable to parse selected movie from localStorage:", error);
    }
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const source = params.get("source") || "local";

  if (!id) {
    if (detailsContainer) {
      detailsContainer.innerHTML =
        "<p>No movie selected yet. Choose one from Home or Discover.</p>";
    }
    return;
  }

  let movies = [];

  if (source === "tmdb") {
    movies = await fetchTrendingMovies();
  }

  if (!movies.length) {
    movies = (await fetchLocalMovies()).map((movie) => ({
      ...movie,
      source: "local",
    }));
  }

  const movie = movies.find((item) => String(item.id) === String(id));

  if (!movie) {
    if (detailsContainer) {
      detailsContainer.innerHTML = "<p>Movie not found.</p>";
    }
    return;
  }

  renderDetails(movie);
  setupDialog(movie);
}

initDetails();
