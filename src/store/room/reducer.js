import { ALL_ROOMS, ONE_ROOM, ADD_ROOM_TO_STORE, NEW_MESSAGE } from "./actions";
const NEW_GAME = "NEW_GAME";
const FETCH_DATA_OF_ONE_ROOM = "FETCH_DATA_OF_ONE_ROOM";
const BOARD_UPDATED = "BOARD_UPDATED";

const initialState = {
  rooms: [],
  room: {}
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case BOARD_UPDATED: {
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.id === action.payload.roomId) {
            return {
              ...room,
              game: action.payload.roomId
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
    case FETCH_DATA_OF_ONE_ROOM: {
      return {
        ...state,
        room: action.payload
      };
    }
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
