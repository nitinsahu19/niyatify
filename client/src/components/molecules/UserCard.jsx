import { User } from "lucide-react";
export const UserCard = ({ user }) => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
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
          <h2 className="card-title">
            {user?.firstName + " " + user?.lastName}
          </h2>
          {/* <p>{user?.emailId}</p> */}
          <p>
            {user?.gender?.[0].toUpperCase() +
              user?.gender?.slice(1) +
              ", " +
              user?.age}
          </p>
          <p>{user?.about}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};
