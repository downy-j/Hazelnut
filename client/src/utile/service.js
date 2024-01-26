import axios from "axios";

export const SERVER_URL = "http://localhost:5000";

// GET - whit out header
export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// GET - whit header
export const getRequestWithHeaders = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// POST
export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// PATCH
export const patchRequest = async (url, body) => {
  try {
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

const extractErrorMessage = (error) => {
  return error.response?.data?.message || error.message;
};
