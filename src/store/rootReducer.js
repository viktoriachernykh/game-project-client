import { combineReducers } from "redux";
import user from "./user/reducer.js";
import rooms from "./room/reducer";

export default combineReducers({
  session: user,
  rooms
});
