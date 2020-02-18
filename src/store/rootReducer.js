import { combineReducers } from "redux";
import user from "./user/reducer.js";
import channels from "./chat/reducer";

export default combineReducers({
  session: user,
  channels
});
