import { NEW_USER, SET_SESSION } from "./actions";

const initialState = {
  jwt: "",
  user: {}
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SESSION: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user
      };
    }
    case NEW_USER: {
      return action.payload;
    }
    default:
      return state;
  }
}
