import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../Redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("meera@gmail.com");
  const [password, setPassword] = useState("Meera@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const loginError = useSelector((store) => store.auth.loginError);

  // Side effects
  useEffect(() => {
    setError(loginError);
  }, [loginError]);

  return (
    <div className="flex flex-col justify-center items-center my-8">
      {/* Heading */}
      <h1
        className="text-3xl font-semibold text-white text-center mb-6"
        aria-label="Login to your account"
      >
        Login to Your Account
      </h1>

      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          {/* Email input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email address?</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter you email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          {/* Password input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password?</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter you password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {error && (
            <span className="text-red-500 text-sm mt-1 block">{error}</span>
          )}

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary flex"
              onClick={() => dispatch(loginUser(email, password, navigate))}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
