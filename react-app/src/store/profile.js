const SET_PROFILE = "profile/SET_PROFILE";
const REMOVE_PROFILE = "profile/REMOVE_PROFILE";
const DELETE_PROFILE = "profile/DELETE_PROFILE";
const ADD_PROFILE = "profile/ADD_PROFILE";
const GET_PROFILES = "profile/GET_PROFILES";

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

export const selectProfile = (profile) => async (dispatch) => {
  dispatch(setProfile(profile));
};

export const retrieveProfiles = (userId) => async (dispatch) => {
  // console.log('thunk fired!')
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
    // console.log("From Thunk", data)

    dispatch(getProfiles(data));
  }
  return res;
};

const initialState = { profile: null };
export default function reducer(state = initialState, action) {
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
    default:
      return state;
  }
}
