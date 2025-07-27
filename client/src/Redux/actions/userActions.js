import axios from "axios";
import { setFeedsData } from "../reducers/feedsSlice";
import { setFeedsError } from "../reducers/errorSlice";

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
