import { useSelector } from "react-redux";

export const Navbar = () => {
  const user = useSelector((store) => store.user.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">niyatify</a>
      </div>
      <div className="flex gap-2">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        /> */}
        {user && (
          <div className="dropdown dropdown-end mx-4">
            {/* Welcome text */}
            <span className="text-sm font-medium text-white  mx-4">
              Welcome, {user?.user?.firstName}
            </span>

            {/* Avatar dropdown */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={user?.user?.firstName?.slice(0, 1)}
                  src={user?.user?.photoUrl}
                />
              </div>
            </div>
            {/* List of profile options */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
