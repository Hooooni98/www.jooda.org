import { combineReducers } from "redux";
import authorizationReducer from "./authorization_reducer";

const rootReducer = combineReducers({
  authorizationReducer,
});

export default rootReducer;

// useSelector로 스토어에 접근할 때 필요하다!
export type RootState = ReturnType<typeof rootReducer>;