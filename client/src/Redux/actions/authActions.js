import axios from "axios";
import { addUser } from "../reducers/userSlice";

export const loginUser = (emailId, password, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.user));
      navigate("/");
      return response?.data?.user;
    } catch (error) {
      console.error("Login failed: : ", error.message);
    }
  };
};

export const getUser = (navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/profile`,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data));
      return response.data;
    } catch (error) {
      navigate("/login");
      console.error("Profile fetching failed: : ", error.message);
    }
  };
};
