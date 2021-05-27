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
    console.log('in retrieveMovies before fetch')

    let res = await fetch(`/api/movies`)

    console.log('in retrieveMovies after fetch')

    if (res.ok) {
        const allMovies = await res.json();
        let normMovies = {}
        for (let i = 0; i < allMovies['movies'].length; i++) {
            let movie = allMovies.movies[i]
            normMovies[movie.id] = movie
        }
        dispatch(getMovies(normMovies));
    }
    return res;
};

export const retrieveMoviesByGenreId = (genreId) => async (dispatch) => {
    console.log('genreId', genreId)
    console.log('in retrieveMoviesByGenre before fetch')
    let res = await fetch(`/api/movies/genre/${genreId}`)
    console.log('in retrieveMoviesByGenre after fetch')
    console.log('res =', res)
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
