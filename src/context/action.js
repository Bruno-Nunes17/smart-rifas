import * as types from "./types";
import * as services from "../services/services";

// Login

export const loginInitAction = () => ({
  type: types.loginInitType,
});

export const loginSuccessAction = (user) => ({
  type: types.loginSuccessType,
  payload: user,
});

export const loginFailAction = (user) => ({
  type: types.loginFailType,
  payload: user,
});

export const loginAction = async (dispatch, body) => {
  dispatch(loginInitAction());
  const user = await services.adminLogin(body);
  if (!user) {
    dispatch(loginFailAction(user));
    return;
  }
  dispatch(loginSuccessAction(user));
};

// Seller Register

export const sellerRegisterInitAction = () => ({
  type: types.sellerRegisterInitType,
});

export const sellerRegisterSuccessAction = (user) => ({
  type: types.sellerRegisterSuccessType,
  payload: user,
});

export const sellerRegisterFailAction = (user) => ({
  type: types.sellerRegisterFailType,
  payload: user,
});

export const sellerRegisterAction = async (dispatch, body, token) => {
  dispatch(sellerRegisterInitAction());
  const user = await services.sellerRegister(body, token);
  if (user.error) {
    console.log(user);
    dispatch(sellerRegisterFailAction(user));
    return;
  }
  dispatch(sellerRegisterSuccessAction(user));
};

// Seller Login

export const loginSellerAction = async (dispatch, body) => {
  dispatch(loginInitAction());
  const user = await services.sellerLogin(body);
  if (!user) {
    dispatch(loginFailAction(user));
    return;
  }
  dispatch(loginSuccessAction(user));
};

//  logout

export const logoutInitAction = () => ({
  type: types.logoutInitType,
});

export const logoutSuccessAction = (user) => ({
  type: types.logoutSuccessType,
  payload: user,
});

export const logoutAction = async (dispatch) => {
  dispatch(logoutInitAction());
  const user = await services.logout();
  dispatch(logoutSuccessAction(user));
};

//  Get Rifas

export const getRifasInitAction = () => ({
  type: types.getRifasInitType,
});

export const getRifasSuccessAction = (data) => ({
  type: types.getRifasSuccessType,
  payload: data,
});

export const getRifasFailAction = (data) => ({
  type: types.getRifasFailType,
  payload: data,
});

export const getRifasAction = async (dispatch, token, filter) => {
  dispatch(getRifasInitAction());
  const data = await services.getRifas(token, filter);
  if (!data) {
    dispatch(getRifasFailAction(data));
    return;
  }
  dispatch(getRifasSuccessAction(data));
};

// New Rifa

export const newRifaInitAction = () => ({
  type: types.newRifaInitType,
});

export const newRifaSuccessAction = (data) => ({
  type: types.newRifaSuccessType,
  payload: data,
});

export const newRifaFailAction = (data) => ({
  type: types.newRifaFailType,
  payload: data,
});

export const newRifaAction = async (dispatch, body, token) => {
  dispatch(newRifaInitAction());
  const data = await services.newRifa(body, token);
  if (!data) {
    dispatch(newRifaFailAction(data));
    return;
  }
  dispatch(newRifaSuccessAction(data));
};

// Get Rifa

export const getRifaInitAction = () => ({
  type: types.getRifaInitType,
});

export const getRifaSuccessAction = (data) => ({
  type: types.getRifaSuccessType,
  payload: data,
});

export const getRifaFailAction = (data) => ({
  type: types.getRifaFailType,
  payload: data,
});

export const getRifaAction = async (dispatch, id, token, filter) => {
  dispatch(getRifaInitAction());
  const data = await services.getRifa(id, token, filter);
  if (!data) {
    dispatch(getRifaFailAction(data));
    return;
  }
  dispatch(getRifaSuccessAction(data));
};

// Get cota

export const getCotaInitAction = () => ({
  type: types.getCotaInitType,
});

export const getCotaSuccessAction = (data) => ({
  type: types.getCotaSuccessType,
  payload: data,
});

export const getCotaFailAction = (data) => ({
  type: types.getCotaFailType,
  payload: data,
});

export const getCotaAction = async (dispatch, cota) => {
  dispatch(getCotaInitAction());
  dispatch(getCotaSuccessAction(cota));
};

//

export const isLoggedInitAction = () => ({
  type: types.isLoggedInitType,
});

export const isLoggedSuccessAction = (data) => ({
  type: types.isLoggedSuccessType,
  payload: data,
});

export const isLoggedAction = async (dispatch, cookie) => {
  dispatch(isLoggedInitAction());
  dispatch(isLoggedSuccessAction(cookie));
};

// Sell Cota

export const sellCotaInitAction = () => ({
  type: types.sellCotaInitType,
});

export const sellCotaSuccessAction = (data) => ({
  type: types.sellCotaSuccessType,
  payload: data,
});

export const sellCotaFailAction = (data) => ({
  type: types.sellCotaFailType,
  payload: data,
});

export const sellCotaAction = async (dispatch, body, token) => {
  dispatch(sellCotaInitAction());
  const data = await services.sellCota(body, token);
  if (!data) {
    dispatch(getRifaFailAction(data));
    return;
  }
  dispatch(sellCotaSuccessAction(data));
};

// Get Sellers

export const getSellersInitAction = () => ({
  type: types.getSellersInitType,
});

export const getSellersSuccessAction = (data) => ({
  type: types.getSellersSuccessType,
  payload: data,
});

export const getSellersFailAction = (data) => ({
  type: types.getSellersFailType,
  payload: data,
});

export const getSellersAction = async (dispatch, token) => {
  dispatch(getSellersInitAction());
  const data = await services.getSellers(token);
  if (!data) {
    dispatch(getSellersFailAction(data));
    return;
  }
  dispatch(getSellersSuccessAction(data));
};