import { SAVE_AUTHORIZATION } from "../actions/types";
import { saveAuthorization } from "../actions/authorization_action";

// 리듀서 파라미터 중 initialState의 타입 정의
type AuthorizationStateType = {
  authorization: string;
};

const initialState = {
  authorization: "",
};

// 리듀서 파라미터 중 action의 타입 정의
type AuthorizationActionType =
  | ReturnType<typeof saveAuthorization>;

export default function authorizationReducer(
  state: AuthorizationStateType = initialState,
  action: AuthorizationActionType
) {
  switch (action.type) {
    case SAVE_AUTHORIZATION:
      return { ...state, authorization: action.payload };

    default:
      return state;
  }
}