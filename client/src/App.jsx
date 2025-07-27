import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Login from "./components/templates/Login";
import Profile from "./components/templates/Profile";
import Feeds from "./components/templates/Feeds";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feeds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
