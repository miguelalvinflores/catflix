const GET_MOVIES = 'movie/GET_MOVIES'

const getMovies = (allMovies) => {
    return {
        type: GET_MOVIES,
        payload: allMovies
    }
}

export const retrieveMovies = (movieId) => async (dispatch) => {
    let res = await fetch(`/api/movies/`)
    if (res.ok) {
        const movies = await res.json();

        dispatch(getMovies(movies));
    }
    return res;
};

const initialState = { movie: null };
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_MOVIES:
            return {
                ...state,
                allMovies: action.payload
            }
        default:
            return state;
    }
}
