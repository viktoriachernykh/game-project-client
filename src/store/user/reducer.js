import { NEW_USER, SET_SESSION, LOGOUT_USER } from "./actions";

const initialState = {
  jwt: "",
  user: {}
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case LOGOUT_USER: {
      return {
        jwt: "",
        user: {}
      };
    }
    case SET_SESSION: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user
      };
    }
    case NEW_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}
