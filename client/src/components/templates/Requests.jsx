import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests, setError } from "../../Redux/reducers/requestSlice";
import { useQuery } from "@tanstack/react-query";
import { RequestCard } from "../molecules/RequestCard";

const Requests = () => {
  const dispatch = useDispatch();

  const fetchRequests = async () => {
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
    queryKey: ["requests"],
    queryFn: fetchRequests,
    refetchOnWindowFocus: false,
  });

  console.log(data, "data from query");

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Requests</h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((request, index) => {
          const {
            about,
            emailId,
            age,
            gender,
            photoUrl,
            skills,
            firstName,
            lastName,
          } = request?.fromUserId;

          return (
            <RequestCard
              key={index}
              name={firstName + " " + lastName}
              src={photoUrl}
              about={about}
              age={age}
              skills={skills}
              gender={gender}
              email={emailId}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Requests;
