import * as types from "./types";

export function reducer(state, action) {
  switch (action.type) {
    case types.loginSuccessType:
      return {
        ...state,
        type: types.loginSuccessType,
        user: { ...action.payload.user },
        token: action.payload.token,
        error: action.payload.error,
      };
    case types.sellerRegisterSuccessType:
      return {
        ...state,
        type: types.sellerRegisterSuccessType,
      };
    case types.logoutSuccessType:
      return {
        ...state,
        type: types.logoutSuccessType,
        user: { ...action.payload.user },
        token: action.payload.token,
        error: action.payload.error,
      };
    case types.loginFailType:
      return {
        ...state,
        type: types.logoutSuccessType,
        user: { ...action.payload.user },
        token: action.payload.token,
        error: action.payload.error,
      };
    case types.getRifasSuccessType:
      return {
        ...state,
        type: types.getRifasSuccessType,
        rifas: action.payload.rifas,
      };
    case types.getRifaSuccessType:
      return {
        ...state,
        type: types.getRifaSuccessType,
        error: action.payload.error,
        rifa: action.payload.rifa,
      };
    case types.getCotaSuccessType:
      return {
        ...state,
        type: types.getCotaSuccessType,
        cota: action.payload,
      };
    case types.newRifaSuccessType:
      return {
        ...state,
        type: types.newRifaSuccessType,
        error: action.payload.error,
      };
    case types.sellerRegisterFailType:
      return {
        ...state,
        type: types.sellerRegisterFailType,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
        type: action.type,
      };
  }
}
