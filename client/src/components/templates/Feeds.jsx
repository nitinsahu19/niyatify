import { UserCard } from "../molecules/UserCard";
import { getFeeds } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const Feeds = () => {
  const dispatch = useDispatch();
  const { data, refetch } = useQuery({
    queryKey: ["feeds"],
    queryFn: () => dispatch(getFeeds()),
    refetchOnWindowFocus: false,
  });

  return <>{data && <UserCard user={data[0]} refetch={refetch} />}</>;
};

export default Feeds;
