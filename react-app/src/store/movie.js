const GET_MOVIES = 'movie/GET_MOVIES'
const GET_MOVIES_BY_GENRE ='movie/GET_MOVIES_BY_GENRE'
const getMovies = (allMovies) => {
    return {
        type: GET_MOVIES,
        payload: allMovies
    }
}

const getMoviesbyGenre = (genre) => {
    return {
        type:GET_MOVIES_BY_GENRE,
        payload: genre
    }
}

export const retrieveMovies = () => async (dispatch) => {
    let res = await fetch(`/api/movies/`)
    if (res.ok) {
        const allMovies = await res.json();
        let normMovies = {}
        for (let movie in allMovies.movies) {
            normMovies[movie.id] = movie
        }
        dispatch(getMovies(normMovies));
    }
    return res;
};

export const retrieveMoviesByGenreId = (genreId) => async (dispatch) => {
    let res = await fetch(`/api/movies/genre/${genreId}`)

    if (res.ok) {
        const genre = await res.json();

        dispatch(getMoviesbyGenre(genre));
    }
}

const initialState = { movie: null };
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
            return {
                ...state,
                allMovies: action.payload
            }
        case GET_MOVIES_BY_GENRE:
            return {
                ...state,
                genres: {...state.genres, ...action.payload}
            }
        default:
            return state;
    }
}
