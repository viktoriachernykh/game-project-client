import { combineReducers } from "redux";
import user from "./user";

export default combineReducers({
  session: user
});
