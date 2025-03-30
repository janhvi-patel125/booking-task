import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  const toastNotification = {
    position: "top-right",
    autoCloseTimeOut: 1500,
    hideProgress: true,
  };
  return (
    <ToastContainer
      position={toastNotification.position as ToastPosition}
      closeButton={true}
      autoClose={toastNotification.autoCloseTimeOut}
      hideProgressBar={toastNotification.hideProgress}
      pauseOnHover={true}
    />
  );
};

export default ToastNotification;
