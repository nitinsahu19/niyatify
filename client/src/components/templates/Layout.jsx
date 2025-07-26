import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../organisms/Navbar";
import { Footer } from "../organisms/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/actions/authActions";

const Layout = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);
  useEffect(() => {
    try {
      if (user) {
        console.log(user);
        navigate("/");
      }
      dispatch(getUser(navigate));
    } catch (error) {
      console.error("User fetching failed !!", error.message);
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
