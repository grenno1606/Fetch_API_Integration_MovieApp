const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const detail = document.querySelector(".detail");
const load = document.querySelector(".load");

const renderMovie = (movie) => {
  detail.innerHTML = `<div class="col-12 col-md-4">
      <img class="detail__poster" src="${movie.Poster}" alt="">
    </div>
    <div class="col-12 col-md-8">
      <div class="detail__content">
        <div class="detail__title-group">
          <p class="detail__title">${movie.Title}</p>
          <div class="detail__rating">
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge detail__icon" focusable="false" viewBox="0 0 24 24" color="#e4bb24" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
            <div>
              <div class="detail__rating-point">${movie.imdbRating} <span class="detail__rating-sum">/10</span></div>
              <p class="detail__votes">${movie.imdbVotes}</p>
            </div>
          </div>
        </div>
        <div class="detail__meta">
          <span class="detail__meta--item">${movie.Year}</span>
          <span class="detail__meta--item">${movie.Rated}</span>
          <span class="detail__meta--item">${movie.Released}</span>
          <span class="detail__meta--item">${movie.Runtime}</span>
        </div>
        <p class="detail__description">${movie.Plot}</p>
        <div class="detail__info">
          <div class="info-item">
            <div class="info-item__label">Genre :</div>
            <p class="info-item__value">${movie.Genre}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Director :</div>
            <p class="info-item__value">${movie.Director}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Writer :</div>
            <p class="info-item__value">${movie.Writer}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Actors :</div>
            <p class="info-item__value">${movie.Actors}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Language :</div>
            <p class="info-item__value">${movie.Language}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Country :</div>
            <p class="info-item__value">${movie.Country}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Awards :</div>
            <p class="info-item__value">${movie.Awards}</p>
          </div>
          <div class="info-item">
            <div class="info-item__label">Production :</div>
            <p class="info-item__value">${movie.Production}</p>
          </div>
        </div>
      </div>
    </div>`;
};

const getMovieById = async (id) => {
  load.classList.remove("display-none");
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=fff61886&i=${id}&plot=full`
  );
  const data = res.json();
  load.classList.add("display-none");
  return data;
};

getMovieById(id).then((data) => {
  renderMovie(data);
});
