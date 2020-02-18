export const ALL_ROOMS = "ALL_ROOMS";
export const ONE_ROOM = "ONE_ROOM";
export const NEW_MESSAGE = "NEW_MESSAGE_IN_EXISTING_ROOM";
export const ADD_ROOM_TO_STORE = " ADD_ROOM_TO_STORE_AS_CUURENT_ROOM";

export function fetchActions(action) {
  return (dispatch, getState) => {
    console.log("stream goes to actions?", action);
    dispatch(action);
  };
}

export function chooseRoom(room) {
  return (dispatch, getState) => {
    const action = createRoomAction(room);
    dispatch(action);
  };
}

function createRoomAction(room) {
  return {
    type: ADD_ROOM_TO_STORE,
    payload: room
  };
}
