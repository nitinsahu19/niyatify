import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  signUpUser,
} from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("meerasahu@gmail.com");
  const [password, setPassword] = useState("Meera@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        {isLoginForm ? "Login to Your Account" : "Sign up for a new account"}
      </h1>

      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          {!isLoginForm && (
            <>
              {" "}
              {/* First name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First name?</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              {/* Last name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last name?</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </fieldset>
            </>
          )}

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

          {/* Buttons */}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary flex"
              onClick={() => {
                if (isLoginForm) {
                  dispatch(loginUser(email, password, navigate));
                } else {
                  dispatch(
                    signUpUser(
                      { email, password, firstName, lastName },
                      navigate
                    )
                  );
                }
              }}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setLoginForm((prev) => !prev)}
            className="text-sm mt-1 block text-secondary hover:underline focus:outline-none"
          >
            {isLoginForm ? "New User? Sign up" : "Existing User? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
