import axios from "axios";

const baseUrl = "https://smart-rifas-api.vercel.app";

const defaulUser = {
  user: {},
  token: null,
  error: [],
};

export const checkDate = (date) => {
  const dataRifa = new Date(date);
  const dataAtual = new Date();
  if (dataAtual > dataRifa) {
    return;
  }
  return dataRifa;
};

const headerFormat = (token) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return header;
};

export const getRifas = async (token, filter = "all") => {
  const header = headerFormat(token);
  try {
    const response = await axios.get(`${baseUrl}/rifas`, header);
    let rifas = response.data;
    return {
      rifas,
    };
  } catch (e) {
    const { error } = e.response.data;
    return { error };
  }
};

export const getSellers = async (token) => {
  const header = headerFormat(token);
  try {
    const response = await axios.get(`${baseUrl}/sellers/show`, header);
    const sellers = response.data;
    return {
      sellers,
    };
  } catch (e) {
    const { error } = e.response.data;
    return { error };
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
    const { error } = e.response.data;
    return { error };
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

export const deleteRifa = async (body, token) => {
  const header = headerFormat(token);
  console.log(body);
  try {
    await axios.post(`${baseUrl}/rifa/delete`, body, header);
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

export const sellCota = async (body, token) => {
  const header = headerFormat(token);
  try {
    await axios.post(`${baseUrl}/rifa/sell`, body, header);
    return {
      error: [],
    };
  } catch (e) {
    const { error } = e.response.data;
    return { error };
  }
};
