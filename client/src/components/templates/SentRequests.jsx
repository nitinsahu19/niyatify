import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests, setError } from "../../Redux/reducers/requestSlice";
import { useQuery } from "@tanstack/react-query";
import { InvitationTabs } from "../molecules/InvitatationTab";

export const SentRequests = () => {
  const dispatch = useDispatch();

  const fetchSendRequests = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(response?.data?.data));
      return response?.data || [];
    } catch (error) {
      dispatch(setError(error?.message));
      console.error(error?.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["sentRequests"],
    queryFn: fetchSendRequests,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center justify-center">
      <InvitationTabs />

      <div className="text-center text-gray-500 max-w-md">
        <p className="text-lg mb-2">
          🚧 This page is currently under development.
        </p>
        <p className="text-sm">
          We're working hard to bring this feature to life. Please check back
          soon!
        </p>
      </div>
    </section>
  );
};
