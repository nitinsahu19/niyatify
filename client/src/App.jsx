import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Login from "./components/templates/Login";
import Feeds from "./components/templates/Feeds";
import UserProfile from "./components/templates/UserProfile";
import { Notificaiton } from "./components/molecules/Notification";

const App = () => {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feeds />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
      <Notificaiton />
    </>
  );
};

export default App;
