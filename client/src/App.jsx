import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Login from "./components/templates/Login";
import Feeds from "./components/templates/Feeds";
import Connections from "./components/templates/Connections";
import Requests from "./components/templates/Requests";
import UserProfile from "./components/templates/UserProfile";
import { Notificaiton } from "./components/molecules/Notification";
import { SentRequests } from "./components/templates/SentRequests";
import Chat from "./components/templates/Chat";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Feeds />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/sendRequest" element={<SentRequests />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
      <Notificaiton />
    </>
  );
};

export default App;
