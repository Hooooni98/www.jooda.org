import { SAVE_AUTHORIZATION } from "./types";

export function saveAuthorization(test: string) {
  return {
    type: SAVE_AUTHORIZATION,
    payload: test,
  };
}