import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {};

export const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS_TOAST":
      toast.success(action.payload.message, action.payload.options);
      return state;
    case "WARN_TOAST":
      toast.warn(action.payload.message, action.payload.options);
      return state;
    case "FAIL_TOAST":
      toast.error(action.payload.message, action.payload.options);
      return state;
    case "INFO_TOAST":
      toast.info(action.payload.message, action.payload.options);
      return state;
    default:
      return state;
  }
};

export const showToast = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  return {
    type,
    payload: { message, options },
  };
};

export const ToastifyContainer = () => <ToastContainer />;
