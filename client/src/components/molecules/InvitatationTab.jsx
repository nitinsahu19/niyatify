import { useLocation, useNavigate } from "react-router-dom";

export const InvitationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isReceived = location.pathname === "/requests";
  const isSent = location.pathname === "/sendRequest";

  return (
    <div className="flex justify-center my-6">
      <div className="bg-gray-100 rounded-full p-1 inline-flex">
        <button
          onClick={() => navigate("/requests")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isReceived
              ? "bg-base-200 text-white"
              : "text-gray-600 hover:bg-blue-100"
          }`}
        >
          Requests Received
        </button>
        
        <button
          onClick={() => navigate("/sendRequest")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            isSent
              ? "bg-base-200 text-white"
              : "text-gray-600 hover:bg-blue-100"
          }`}
        >
          Requests Sent
        </button>
      </div>
    </div>
  );
};
