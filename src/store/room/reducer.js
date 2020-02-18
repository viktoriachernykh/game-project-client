import { ALL_ROOMS, ONE_ROOM, ADD_ROOM_TO_STORE } from "./actions";

const initialState = {
  rooms: [],
  room: {}
};

export default function(state = initialState, action = {}) {
  console.log(" Reducer was reached!");
  switch (action.type) {
    case ALL_ROOMS: {
      // console.log("stream goes to reducer?", action.payload);
      return {
        ...state,
        rooms: action.payload
      };
    }
    case ONE_ROOM: {
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      };
    }
    case ADD_ROOM_TO_STORE: {
      return {
        ...state,
        room: action.payload
      };
    }
    default:
      return state;
  }
}
