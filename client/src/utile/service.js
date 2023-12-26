import axios from "axios";

export const SERVER_URL = "http://localhost:5000";

// POST
export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// GET
export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

const extractErrorMessage = (error) => {
  return error.response?.data?.message || error.message;
};
