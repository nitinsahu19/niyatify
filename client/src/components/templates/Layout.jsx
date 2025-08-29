import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../organisms/Navbar";
import { Footer } from "../organisms/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/authActions";
import { addUser } from "../../redux/reducers/userSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // const isLoggedIn = localStorage.getItem("user");
      // const { firstName, lastName, emailId, photoUrl, skills, gender } =
      //   isLoggedIn;
      // if (isLoggedIn) {
      //   dispatch(
      //     addUser({ firstName, lastName, emailId, photoUrl, skills, gender })
      //   );
      //   navigate("/");
      // }
      dispatch(getUser(navigate));
    } catch (error) {
      console.error("User fetching failed !!", error.message);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
