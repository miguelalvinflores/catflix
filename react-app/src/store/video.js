const VIDEO_ENDED = "video/VIDEO_ENDED";
const VIDEO_NOT_ENDED = "video/VIDEO_NOT_ENDED";

const setVideoEnded = () => ({
  type: VIDEO_ENDED,
  payload: true,
});

const removeVideoEnded = () => ({
  type: VIDEO_NOT_ENDED,
  payload: false,
});

export const setVideoEnd = () => (dispatch) => {
  dispatch(setVideoEnded());
};

export const setVideoStart = () => (dispatch) => {
  dispatch(removeVideoEnded());
};

const initialState = { end: null };
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case VIDEO_ENDED:
      newState["end"] = action.payload;
      return newState;
    case VIDEO_NOT_ENDED:
      newState["end"] = action.payload;
      return newState;
    default:
      return state;
  }
}
