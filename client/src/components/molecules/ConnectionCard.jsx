export const ConnectionCard = ({ src, about, gender, email, name }) => {
  return (
    <div className="card bg-base-300 w-80 shadow-sm  flex justify-center items-center p-4">
      <figure>
        <img src={src} alt={"User Image"} className="w-18 h-18" />
      </figure>
      <div className="card-body">
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
      </div>
    </div>
  );
};
