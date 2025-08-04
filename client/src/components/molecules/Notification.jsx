import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CircleX } from "lucide-react";
import { closeNotification } from "../../redux/reducers/notificationSlice";

export const Notificaiton = () => {
  const dispatch = useDispatch();
  const { isVisible, type, message } = useSelector(
    (store) => store.notification
  );

  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-green-700";
      case "error":
        return "bg-red-700";
      case "warning":
        return "bg-yellow-700";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(closeNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-2 ${getColor()} text-white`}
      style={{ zIndex: 10000 }}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <CircleX
          onClick={() => dispatch(closeNotification())}
          className="cursor-pointer"
          size={17}
        />
      </div>
    </div>
  );
};
