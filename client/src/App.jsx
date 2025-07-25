import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Login from "./components/templates/Login";
import Profile from "./components/templates/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
