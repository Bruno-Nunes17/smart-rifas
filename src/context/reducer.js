import * as types from "./types";

export function reducer(state, action) {
  switch (action.type) {
    case types.loginSuccessType:
      return {
        
      };
    default:
      return {
        ...state,
        type: action.type,
      };
  }
}
