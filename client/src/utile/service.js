import axios from "axios";

export const SERVER_URL = "http://localhost:5000";

// GET
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
export const postRequest = async (url, body, accToken, contentType) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": contentType,
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
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// 쿠키 가져오기
export const getCookies = (name) => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith(name + "=")) {
      const cookieValue = cookie.substring(name.length + 1);
      return cookieValue;
    }
  }
  return null;
};

const extractErrorMessage = (error) => {
  return error.response?.data?.message || error.message;
};
