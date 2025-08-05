import { useDispatch } from "react-redux";
import { acceptRequest, declineRequest } from "../../redux/actions/userActions";
import { useQueryClient } from "@tanstack/react-query";

export const RequestCard = ({
  name,
  about,
  email,
  age,
  gender,
  src,
  skills,
  id,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleAccept = ({ id, queryClient }) => {
    if (id) {
      dispatch(acceptRequest({ id, queryClient }));
    }
  };

  const handleReject = ({ id, queryClient }) => {
    if (id) {
      dispatch(declineRequest({ id, queryClient }));
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-sm flex justify-center items-center p-4">
      <figure>
        <img src={src} alt={"User Image"} className="w-18 h-18 rounded-full" />
      </figure>
      <div className="card-body flex justify-center items-center gap-5">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-center">
          {gender && (
            <div className="badge badge-outline">
              {gender?.slice(0, 1).toUpperCase() + gender?.slice(1)}
            </div>
          )}
          {email && <div className="badge badge-outline">{email}</div>}
        </div>

        <div className="card-actions flex justify-center items-center">
          <button
            onClick={() => handleReject({ id, queryClient })}
            className="btn btn-primary"
          >
            Decline
          </button>
          <button
            onClick={() => handleAccept({ id, queryClient })}
            className="btn btn-secondary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
