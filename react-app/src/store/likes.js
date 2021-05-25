const SET_LIKES = "likes/SET_LIKES";
const REMOVE_LIKES = "likes/REMOVE_LIKES";
const DELETE_LIKES = "likes/DELETE_LIKES";
const ADD_LIKES = "likes/ADD_LIKES";

const setLikes = (likes) => ({
  //  expecting likes to come in as array of movieId's
  type: SET_LIKES,
  payload: likes,
});

const removeLikes = () => ({
  type: REMOVE_LIKES,
});

const deleteLike = (movieId) => ({
  type: DELETE_LIKES,
  payload: movieId,
});

const addLike = (movieId) => ({
  type: ADD_LIKES,
  payload: movieId,
});

export const storeLikes = (likes) => (dispatch) => {
  //  expecting likes to come in as array of movieId's
  dispatch(setLikes(likes));
};

export const clearLikes = (likes) => (dispatch) => {
  dispatch(removeLikes(likes));
};

export const addOneLike =
  (profileId, movieId, upvoteDownvote) => async (dispatch) => {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileId,
        movieId,
        upvoteDownvote,
      }),
    });
    dispatch(addLike(movieId));
  };

export const deleteOneLike = (profileId, movieId) => async (dispatch) => {
  const res = await fetch("/api/likes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profileId,
      movieId,
    }),
  });
  dispatch(deleteLike(movieId));
};

const initialState = { likes: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_LIKES:
      for (let movieId in action.payload) {
        newState[likes][movieId] = movieId;
      }
      return newState;
    case REMOVE_LIKES:
      return { likes: null };
    case ADD_LIKES: {
      //   let newState = { ...state };
      newState[likes][action.payload] = action.payload;
      return newState;
    }
    case DELETE_LIKES: {
      delete newState[likes][action.payload];
    }
    default:
      return state;
  }
}
