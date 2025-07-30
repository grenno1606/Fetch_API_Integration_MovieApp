const listMovie = document.querySelector(".home__list");
const loading = document.querySelector(".loading__list");
const input = document.querySelector(".input__text");
const btnSearch = document.querySelector(".input__icon");
const message = document.querySelector(".home__message");
let page = 1;
let query = "man";
function renderMovieList(movies, merge = false) {
  let str = "";
  movies.forEach((movie) => {
    str =
      str +
      ` <div class="col-12 col-md-6 col-l-3">
          <div class="card">
            <a href="/pages/detail.html?id=${movie.imdbID}" class="card__info">
              <img class="card__poster" src="${movie.Poster}" alt="">
              <h2 class="card__title">${movie.Title}</h2>
            </a>
            <div class="card__group">
              <div class="card__year">
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall card__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path>
                </svg>
                <span>${movie.Year}</span>
              </div>
              <div class="card__icon card__icon--heart">
                <svg class="MuiSvgIcon-root card__icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>`;
  });
  if (merge) {
    listMovie.innerHTML = listMovie.innerHTML + str;
  } else listMovie.innerHTML = str;
}

const getMovieList = async (query = "man", page = 1) => {
  loading.classList.remove("display-none");
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=fff61886&s=${query}&page=${page}`
  );
  const data = await res.json();
  loading.classList.add("display-none");
  return data;
};

getMovieList().then((data) => {
  renderMovieList(data.Search);
});

btnSearch.addEventListener("click", () => {
  query = input.value;
  listMovie.innerHTML = "";
  getMovieList(query).then((data) => {
    if (data.Response == "True") {
      message.classList.add("display-none");
      renderMovieList(data.Search);
    } else {
      listMovie.innerHTML = "";
      message.classList.remove("display-none");
      message.textContent = data.Error;
    }
  });
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    btnSearch.click();
  }
});

let isLoading = false;

window.addEventListener("scroll", () => {
  if (isLoading) return;
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const fullHeight = document.body.offsetHeight;

  if (scrollTop + viewportHeight >= fullHeight - 50) {
    isLoading = true;

    loadMore().then(() => {
      isLoading = false;
    });
  }
});

const loadMore = async () => {
  page++;
  const data = await getMovieList(query, page);
  renderMovieList(data.Search, true);
};
