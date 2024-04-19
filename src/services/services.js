import axios from "axios";

const baseUrl = "https://smart-rifas-api.vercel.app";

const defaulUser = {
  user: {},
  token: null,
  error: [],
};

const headerFormat = (token) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return header;
};

export const getRifas = async (token) => {
  const header = headerFormat(token);
  try {
    const response = await axios.get(`${baseUrl}/rifas`, header);
    const rifas = response.data;
    return {
      rifas,
    };
  } catch (e) {
    console.log(e);
  }
};

export const getRifa = async (id, token) => {
  const header = headerFormat(token);
  const body = { id };
  try {
    const response = await axios.post(`${baseUrl}/rifa`, body, header);
    const rifa = response.data;
    return {
      rifa,
      error: [],
    };
  } catch (e) {
    console.log(e);
  }
};

export const newRifa = async (body, token) => {
  const header = headerFormat(token);
  try {
    const response = await axios.post(`${baseUrl}/rifa/new`, body, header);
    const rifa = response.data;
    return {
      rifa,
      error: [],
    };
  } catch (e) {
    const { error } = e.response.data;
    return { error };
  }
};

export const adminLogin = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, body);
    const { user, token } = response.data;
    return {
      user,
      token,
      error: [],
    };
  } catch (e) {
    const { error } = e.response.data;
    return { ...defaulUser, error };
  }
};

export const sellerRegister = async (body, token) => {
  const header = headerFormat(token);
  try {
    const response = await axios.post(
      `${baseUrl}/sellers/register`,
      body,
      header
    );
    const { user } = response.data;
    return {
      user,
      error: [],
    };
  } catch (e) {
    const { error } = e.response.data;
    return { error };
  }
};

export const sellerLogin = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/sellers/login`, body);
    const { user, token } = response.data;
    return {
      user,
      token,
      error: [],
    };
  } catch (e) {
    const { error } = e.response.data;
    return { ...defaulUser, error };
  }
};

export const logout = async () => {
  return defaulUser;
};
