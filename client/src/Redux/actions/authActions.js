import axios from "axios";
import { addUser } from "../reducers/userSlice";

export const loginUser = (emailId, password) => {
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
      dispatch(addUser(response.data));
      return response;
    } catch (error) {
      console.error("Login failed: : ", error.message);
    }
  };
};
