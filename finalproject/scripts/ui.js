const SELECTED_MOVIE_KEY = "selectedMovie";

export function createMovieCard(movie) {
  const article = document.createElement("article");
  article.classList.add("movie-card");

  article.innerHTML = `
    <img
      src="${movie.poster}"
      alt="Poster of ${movie.title}"
      width="500"
      height="750"
      loading="lazy"
    />
    <div class="movie-content">
      <h2>${movie.title}</h2>
      <p class="meta">Release: ${movie.releaseDate}</p>
      <p class="meta">Rating: ${movie.rating}</p>
      <p class="meta">Genre: ${movie.genre}</p>
      <p class="meta">Runtime: ${movie.runtime}</p>
      <a class="button details-link" href="details.html">View Details</a>
    </div>
  `;

  const detailsLink = article.querySelector(".details-link");
  detailsLink?.addEventListener("click", () => {
    localStorage.setItem(SELECTED_MOVIE_KEY, JSON.stringify(movie));
  });

  return article;
}

export function renderMovies(container, movies) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    container.appendChild(createMovieCard(movie));
  });
}
