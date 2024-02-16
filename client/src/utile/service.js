import axios from "axios";

export const SERVER_URL = "http://localhost:5000";

// GET - whit out header
export const getRequest = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// POST
export const postRequest = async (url, body, accToken) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${accToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// ImgPost
export const imgPostRequest = async (url, body, accToken) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// PATCH
export const patchRequest = async (url, body, accToken) => {
  try {
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// DELETE
export const deleteRequest = async (url, accToken) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accToken}`,
      },
    });
    console.log(`deleteRequest >> ${JSON.stringify(response)}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

const extractErrorMessage = (error) => {
  return error.response?.data?.message || error.message;
};
