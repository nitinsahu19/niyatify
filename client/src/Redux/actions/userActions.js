import axios from "axios";
import { setFeedsData } from "../reducers/feedsSlice";
import { setFeedsError } from "../reducers/errorSlice";
import { addUser } from "../reducers/userSlice";
import { showNotification } from "../reducers/notificationSlice";

export const getFeeds = () => {
  return async (dispatch) => {
    try {
      const feeds = await axios.get(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/feed`,
        {
          withCredentials: true,
        }
      );

      dispatch(setFeedsData(feeds.data.data));
    } catch (error) {
      dispatch(setFeedsError(error.data.message));
      console.error(error.data.message);
    }
  };
};

export const updateUser = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/profile/edit`,
        body,
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(addUser(response?.data?.data));
        dispatch(
          showNotification({
            type: "success",
            message: "Profile updated successfully!",
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          type: "error",
          message: error?.response?.data?.message,
        })
      );
      console.error("Error -> ", error?.response?.data?.message);
    }
  };
};
