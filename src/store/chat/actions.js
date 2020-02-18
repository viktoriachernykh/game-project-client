export const ALL_CHANNELS = "ALL_CHANNELS";
// export const ONE_CHANNEL = "ONE_CHANNEL";

export function fetchActions(action) {
  return (dispatch, getState) => {
    console.log("stream goes to actions?", action);
    dispatch(allChannelsActionCreator(action));
  };
}

function allChannelsActionCreator(action) {
  return {
    type: ALL_CHANNELS,
    payload: action.payload // all chats with names and messages arrays,
  };
}
