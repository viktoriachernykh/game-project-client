import { ALL_ROOMS, ONE_ROOM, ADD_ROOM_TO_STORE, NEW_MESSAGE } from "./actions";
const NEW_GAME = "NEW_GAME";

const initialState = {
  rooms: [],
  room: {}
};

export default function(state = initialState, action = {}) {
  console.log(" Reducer was reached!");
  switch (action.type) {
    case NEW_GAME: {
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (action.payload.roomId === room.id) {
            return {
              ...room,
              game: action.payload
            };
          } else {
            return room;
          }
        }),
        room:
          action.payload.roomId === state.room.id
            ? { ...state.room, game: action.payload }
            : { ...state.room }
      };
    }
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
    case NEW_MESSAGE: {
      return {
        ...state,
        room: action.payload
      };
    }
    default:
      return state;
  }
}
