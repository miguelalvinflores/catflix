const SET_PROFILE = "profile/SET_PROFILE";
const REMOVE_PROFILE = "profile/REMOVE_PROFILE";
const DELETE_PROFILE = "profile/DELETE_PROFILE";
const ADD_PROFILE = "profile/ADD_PROFILE";

const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

const removeProfile = () => ({
  type: REMOVE_PROFILE,
});

const deleteProfile = () => ({
  type: DELETE_PROFILE,
  payload: profileId,
});

const addProfile = (data) => ({
  type: ADD_PROFILE,
  payload: data,
});

export const selectProfile = (profileId) => async (dispatch) => {
  let res = await fetch(`/api/profile/${profileId}`);
  let profile = await res.json();

  if (!profile) {
    //   return some error msg
    // return;
  }
  dispatch(setProfile(profile));
};

const initialState = { profile: null };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return { profile: action.payload };
    case REMOVE_PROFILE:
      return { profile: null };
    default:
      return state;
  }
}
