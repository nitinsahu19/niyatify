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

export const acceptRequest = ({ id, queryClient }) => {
  return async (dispatch) => {
    try {
      if (!id) {
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/request/review/accepted/${id}`,
        {},
        { withCredentials: true }
      );

      queryClient.invalidateQueries("requests");

      dispatch(
        showNotification({
          type: "success",
          message: response?.data?.message || "Request accepted succesfully",
        })
      );
    } catch (error) {
      dispatch(showNotification({ type: "error", message: error?.message }));
      console.error("ERROR -> ", error?.message);
    }
  };
};

export const declineRequest = ({ id, queryClient }) => {
  return async (dispatch) => {
    try {
      if (!id) {
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/request/review/rejected/${id}`,
        {},
        { withCredentials: true }
      );

      queryClient.invalidateQueries("requests");

      dispatch(
        showNotification({
          type: "success",
          message: response?.data?.message || "Request rejected successfully",
        })
      );
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(
          showNotification({
            type: "error",
            message: "Unauthorized access denied!!",
          })
        );
        return;
      }
      dispatch(showNotification({ type: "error", message: error?.message }));
    }
  };
};
