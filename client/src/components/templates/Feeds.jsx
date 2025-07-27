import { useEffect, useState } from "react";
import { UserCard } from "../molecules/user/UserCard";
import { getFeeds } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedsData } from "../../redux/reducers/feedsSlice";

const Feeds = () => {
  const dispatch = useDispatch();
  const feedsData = useSelector(selectFeedsData);

  // Side effects
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  return <>{feedsData && <UserCard user={feedsData[0]} />}</>;
};

export default Feeds;
