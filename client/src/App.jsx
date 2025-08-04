import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Login from "./components/templates/Login";
import Profile from "./components/templates/Profile";
import Feeds from "./components/templates/Feeds";
import Connections from "./components/templates/Connections";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feeds />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections/>}/> 
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
