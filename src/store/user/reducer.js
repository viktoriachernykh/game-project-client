export default function(state = "", action = {}) {
  switch (action.type) {
    case "JWT": {
      // console.log("2", action.payload); // getting the jwt
      return action.payload;
    }
    case "NEW_USER": {
      return action.payload;
    }
    default:
      return state;
  }
}
