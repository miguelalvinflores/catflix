const GET_MOVIES = "movie/GET_MOVIES";
const GET_MOVIES_BY_GENRE = "movie/GET_MOVIES_BY_GENRE";
const THIS_MOVIE = "movie/THIS_MOVIE";

const thisMovie = (movie) => {
  return {
    type: THIS_MOVIE,
    payload: movie,
  };
};

const getMovies = (allMovies) => {
  return {
    type: GET_MOVIES,
    payload: allMovies,
  };
};

const getMoviesbyGenre = (genre) => {
  return {
    type: GET_MOVIES_BY_GENRE,
    payload: genre,
  };
};

const normalize = (movieList) => {
  let normMovies = {};
  for (let i = 0; i < movieList.length; i++) {
    let movie = movieList[i];
    normMovies[movie.id] = movie;
  }
  return normMovies;
};

export const retrieveMovies = () => async (dispatch) => {
  let res = await fetch(`/api/movies/allMovies`);

  if (res.ok) {
    const allMovies = await res.json();

    const movies = normalize(allMovies.movies);
    dispatch(getMovies(movies));
  }

  return res;
};

export const searchMovies = (searchTerm) => async (dispatch) => {
  const res = await fetch(`api/movies/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchTerm,
    }),
  });

  if (res.ok) {
    const matchingMovies = await res.json();
    // const movies = normalize(matchingMovies.matches)
    dispatch(getMovies(matchingMovies));
  }

  return res;
};

export const chooseMovie = () => async (dispatch) => {
  let res = await fetch("/api/movies/movie");

  if (res.ok) {
    const movie = await res.json();
    dispatch(thisMovie(movie));
  }
};

export const retrieveMoviesByGenreId = (genreId) => async (dispatch) => {
  let res = await fetch(`/api/movies/genre/${genreId}`);

  if (res.ok) {
    const genre = await res.json();
    dispatch(getMoviesbyGenre(genre));
  }
};

const initialState = {
  movie: { url: "", title: "", description: "" },
  allMovies: {},
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case THIS_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };
    case GET_MOVIES:
      return {
        ...state,
        allMovies: { ...state.allMovies, ...action.payload},
      };
    case GET_MOVIES_BY_GENRE:
      return {
        ...state,
        genres: { ...state.genres, ...action.payload },
      };
    default:
      return state;
  }
}
