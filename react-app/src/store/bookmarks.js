const SET_BOOKMARKS = "bookmarks/SET_BOOKMARKS";
const REMOVE_BOOKMARKS = "bookmarks/REMOVE_BOOKMARKS";
const DELETE_BOOKMARKS = "bookmarks/DELETE_BOOKMARKS";
const ADD_BOOKMARKS = "bookmarks/ADD_BOOKMARKS";

const setBookmarks = (bookmarks) => ({
  //  expecting bookmarks to come in as array of movieId's
  type: SET_BOOKMARKS,
  payload: bookmarks,
});

const removeBookmarks = () => ({
  type: REMOVE_BOOKMARKS,
});

const deleteBookmark = (movieId) => ({
  type: DELETE_BOOKMARKS,
  payload: movieId,
});

const addBookmark = (movieId) => ({
  type: ADD_BOOKMARKS,
  payload: movieId,
});

export const storeBookmarks = (bookmarks) => (dispatch) => {
  //  expecting bookmarks to come in as array of movieId's
  dispatch(setBookmarks(bookmarks));
};

export const clearBookmarks = (bookmarks) => (dispatch) => {
  dispatch(removeBookmarks(bookmarks));
};

export const addOneBookmark = (profileId, movieId) => async (dispatch) => {
  const res = await fetch(`/api/movies/${movieId}/bookmarks/${profileId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profileId,
      movieId,
    }),
  });
  dispatch(addBookmark(movieId));
};

export const deleteOneBookmark = (profileId, movieId) => async (dispatch) => {
  const res = await fetch(`/api/movies/${movieId}/bookmarks/${profileId}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({
    //   profileId,
    //   movieId,
    // }),
  });
  dispatch(deleteBookmark(movieId));
};

const initialState = { bookmarks: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_BOOKMARKS:
      for (let movieId in action.payload) {
        newState[bookmarks][movieId] = movieId;
      }
      return newState;
    case REMOVE_BOOKMARKS:
      return { bookmarks: null };
    case ADD_BOOKMARKS: {
      //   let newState = { ...state };
      newState[bookmarks][action.payload] = action.payload;
      return newState;
    }
    case DELETE_BOOKMARKS: {
      delete newState[bookmarks][action.payload];
      return newState;
    }
    default:
      return state;
  }
}
