import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastify = (type, message) => {
  console.log("type", type);
  console.log("message", message);

  toast[type](message, {
    position: "top-right",
    zIndex: 22,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default toastify;
