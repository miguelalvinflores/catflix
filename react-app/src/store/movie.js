const GET_MOVIES = "movie/GET_MOVIES";
const GET_MOVIES_BY_GENRE = "movie/GET_MOVIES_BY_GENRE";
const THIS_MOVIE = "movie/THIS_MOVIE";
const ADD_LIKE = "movie/ADD_LIKE";
const UPDATE_LIKE = "movie/UPDATE_LIKE";
const REMOVE_LIKE = "movie/REMOVE_LIKE";

// MOVIE LIKES
// movioe like actions
const addLike = (movieId, like) => {
  return {
    type: ADD_LIKE,
    payload: { movieId, like },
  };
};
const updateLike = (movieId, like) => {
  return {
    type: UPDATE_LIKE,
    payload: { movieId, like },
  };
};
const removeLike = (movieId, like) => {
  return {
    type: REMOVE_LIKE,
    payload: { movieId, like },
  };
};
// movie like thunks
export const addMovieLike = (movieId, like) => (dispatch) => {
  dispatch(addLike(movieId, like));
};
export const updateMovieLike = (movieId, like) => (dispatch) => {
  dispatch(updateLike(movieId, like));
};
export const removeMovieLike = (movieId, like) => (dispatch) => {
  dispatch(removeLike(movieId, like));
};

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
  let newState = { ...state };
  switch (action.type) {
    case THIS_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };
    case GET_MOVIES:
      return {
        ...state,
        allMovies: { ...state.allMovies, ...action.payload },
      };
    case GET_MOVIES_BY_GENRE:
      return {
        ...state,
        genres: { ...state.genres, ...action.payload },
      };
    case ADD_LIKE:
      newState.allMovies[action.payload.movieId].total_votes += 1;
      if (action.payload.like) {
        newState.allMovies[action.payload.movieId].num_upvote += 1;
      }
      return newState;
    case UPDATE_LIKE:
      if (action.payload.like) {
        newState.allMovies[action.payload.movieId].num_upvote += 1;
      } else {
        newState.allMovies[action.payload.movieId].num_upvote -= 1;
      }
      return newState;
    case REMOVE_LIKE:
      newState.allMovies[action.payload.movieId].total_votes -= 1;
      if (action.payload.like) {
        newState.allMovies[action.payload.movieId].num_upvote -= 1;
      }
      return newState;
    default:
      return state;
  }
}
