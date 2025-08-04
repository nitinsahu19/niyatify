import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateResponse } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addConnections } from "../../Redux/reducers/connectionsSlice";
import { ConnectionCard } from "../molecules/ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_DOMAIN}/user/connections`,
        { withCredentials: true }
      );

      //   if (validateResponse(response)) {
      //     return response?.data;
      //   }
      return response?.data?.data;
    } catch (error) {
      console.error(error?.message);
    }
  };

  const { data } = useQuery({
    queryKey: ["connections"],
    queryFn: fetchConnections,
    refetchOnWindowFocus: false,
  });

  //   Side effects
  useEffect(() => {
    if (data) {
      dispatch(addConnections(data));
    }
  }, [data]);

  if (!data?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        No connections found.
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Your Connections
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((connection, index) => {
          const { photoUrl, about, gender, emailId, firstName, lastName } =
            connection;

          return (
            <ConnectionCard
              key={index}
              name={firstName + " " + lastName}
              src={photoUrl}
              about={about}
              gender={gender}
              email={emailId}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Connections;
