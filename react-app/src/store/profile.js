const SET_PROFILE = "profile/SET_PROFILE";
const REMOVE_PROFILE = "profile/REMOVE_PROFILE";
const DELETE_PROFILE = "profile/DELETE_PROFILE";
const ADD_PROFILE = "profile/ADD_PROFILE";
const GET_PROFILES = "profile/GET_PROFILES";
const GET_BOOKMARKS = 'profile/GET_BOOKMARKS';
const ADD_BOOKMARK = "profile/ADD_BOOKMARK";
const DELETE_BOOKMARK = "profile/DELETE_BOOKMARK";
const ADD_LIKE = "profile/ADD_LIKE";
const UPDATE_LIKE = "profile/UPDATE_LIKE";
const DELETE_LIKE = "profile/DELETE_LIKE";

// likes
const addOnelike = (movieId, upvoteDownvote) => ({
  type: ADD_LIKE,
  payload: { movieId, upvoteDownvote },
});

const updateOnelike = (movieId, upvoteDownvote) => ({
  type: UPDATE_LIKE,
  payload: { movieId, upvoteDownvote },
});

const deleteOnelike = (movieId) => ({
  type: DELETE_LIKE,
  payload: movieId,
});

export const addLike =
  (movieId, upvoteDownvote, profileId) => async (dispatch) => {
    const res = await fetch(`/api/movies/${movieId}/likes/${profileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ upvoteDownvote }),
    });
    if (res.ok) {
      dispatch(addOnelike(movieId, upvoteDownvote));
    }
  };

export const updateLike =
  (movieId, upvoteDownvote, profileId) => async (dispatch) => {
    const res = await fetch(`/api/movies/${movieId}/likes/${profileId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ upvoteDownvote }),
    });
    if (res.ok) {
      dispatch(updateOnelike(movieId, upvoteDownvote));
    }
  };
export const deleteLike = (movieId, profileId) => async (dispatch) => {
  const res = await fetch(`/api/movies/${movieId}/likes/${profileId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteOnelike(movieId));
  }
};
// bookmarks
const addOneBookmark = (movie) => ({
  type: ADD_BOOKMARK,
  payload: movie,
});

const deleteOneBookmark = (movieId) => ({
  type: DELETE_BOOKMARK,
  payload: movieId,
});
// profiles
const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

const removeProfile = () => ({
  type: REMOVE_PROFILE,
});

const deleteProfile = (profileId) => ({
  type: DELETE_PROFILE,
  payload: profileId,
});

const addProfile = (data) => ({
  type: ADD_PROFILE,
  payload: data,
});

const getProfiles = (allProfiles) => {
  return {
    type: GET_PROFILES,
    payload: allProfiles,
  };
};

const getBookmarks = (bookmarks) => {
  return {
    type: GET_BOOKMARKS,
    payload: bookmarks,
  };
};

export const retrieveBookmarks = (profileId) => async (dispatch) => {
  const res = await fetch(`api/profiles/${profileId}/bookmarks`)
  // console.log(res, 'API RESPONSE')
  if (res.ok) {
    const data = await res.json()
    // console.log(data, "DATA")
    dispatch(getBookmarks(data))
  }
}

export const addBookmark = (profileId, movie) => async (dispatch) => {
  const res = await fetch(`/api/movies/${movie.id}/bookmarks/${profileId}`, {
    method: "POST",
  });

  if (res.ok) {
    dispatch(addOneBookmark(movie));
  }
};

export const deleteBookmark = (profileId, movieId) => async (dispatch) => {
  const res = await fetch(`/api/movies/${movieId}/bookmarks/${profileId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteOneBookmark(movieId));
  }
};

export const selectProfile = (profile) => async (dispatch) => {
  dispatch(setProfile(profile));
};

export const logoutProfile = () => async (dispatch) => {
  dispatch(removeProfile());
};

export const retrieveProfiles = (userId) => async (dispatch) => {
  const res = await fetch(`/api/profiles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  });
  // const data = await res.json()
  if (res.ok) {
    const data = await res.json();

    dispatch(getProfiles(data));
  }
  return res;
};

const initialState = { profile: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case GET_PROFILES:
      return {
        ...state,
        allProfiles: action.payload,
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        profile:{
          ...state.profile,
          0: {
            ...state.profile[0],
            bookmarks: action.payload,
          }
        }
      }
    case ADD_BOOKMARK:
      newState.profile[0].bookmarks[action.payload.id] = action.payload;
      return newState;

    case DELETE_BOOKMARK:
      delete newState.profile[0].bookmarks[action.payload];
      return newState;
    case ADD_LIKE:
      newState.profile[0].likes[action.payload.movieId] =
        action.payload.upvoteDownvote;
      return newState;
    case UPDATE_LIKE:
      newState.profile[0].likes[action.payload.movieId] =
        action.payload.upvoteDownvote;
      return newState;
    case DELETE_LIKE:
      delete newState.profile[0].likes[action.payload];
      return newState;
    default:
      return state;
  }
}
