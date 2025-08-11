import { User } from "lucide-react";
import { ignoreRequest, sendRequest } from "../../redux/actions/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useState } from "react";
export const UserCard = ({ user, refetch }) => {
  const [animation, setAnimation] = useState("");
  const [bgColor, setBgColor] = useState("");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  if (!user?._id) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold">No more feeds available</h2>
          <p className="mt-2">Please check back later or try refreshing.</p>
        </div>
      </div>
    );
  }

  const { _id } = user;

  const handleInterested = () => {
    setAnimation("translate-x-full opacity-0");
    setBgColor("bg-green-100");

    dispatch(removeFeed(_id));

    setTimeout(() => {
      dispatch(sendRequest({ id: _id, queryClient }));
    }, 300);
  };

  const handleIgnore = () => {
    setAnimation("-translate-x-full opacity-0");
    setBgColor("bg-red-100");

    setTimeout(() => {
      dispatch(ignoreRequest({ id: _id, queryClient }));
    }, 300);
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div
        className={`card ${bgColor} bg-base-300 w-96 shadow-sm transform transition duration-300 ease-in-out ${animation}`}
      >
        {/* User image */}
        <figure className="px-10 pt-10">
          {user?.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user?.firstName?.slice(0, 1)}
              className="rounded-xl w-10 h-10 object-cover"
            />
          ) : (
            <div className="bg-gray-200 rounded-full w-15 h-15 flex items-center justify-center">
              <User className="text-gray-500 w-6 h-6" />
            </div>
          )}
        </figure>

        <div className="card-body items-center text-center">
          {/* Name */}
          <h2 className="card-title">
            {user?.firstName + " " + user?.lastName}
          </h2>
          <p>{user?.emailId}</p>

          {/* Gender + age */}
          <p>
            {user?.gender?.[0].toUpperCase() +
              user?.gender?.slice(1) +
              ", " +
              user?.age}
          </p>

          {/* About */}
          <p>{user?.about}</p>

          {/* Buttons for actions */}
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleIgnore}>
              Ignore
            </button>
            <button className="btn btn-secondary" onClick={handleInterested}>
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
