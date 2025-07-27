import axios from "axios";
import { addUser, removeUser } from "../reducers/userSlice";
import { setLoginError } from "../reducers/authSlice";

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
      dispatch(setLoginError(error.response.data));
      console.error("Login failed: : ", error.message);
    }
  };
};

export const logoutUser = (navigate) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
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
