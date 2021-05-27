const GET_MOVIES = 'movie/GET_MOVIES'

const getMovies = (allMovies) => {
    return {
        type: GET_MOVIES,
        payload: allMovies
    }
}

export const selectMovie = (movieId) => async (dispatch) => {
    let res = await fetch(`/api/`)
};
