import { toast } from "react-toastify";

function handleSuccess(message) {
  toast.success(message, {
    className: "text-green-400 bg-gray-800 font-sans",
  });
}

function handleError(message) {
  toast.error(message, {
    className: "text-red-400 bg-gray-800 font-sans",
  });
}

function handleWarning(message) {
  toast.warning(message, {
    className: "text-yellow-400 bg-gray-800 font-sans",
  });
}
function handleInfo(message) {
  toast.info(message, {
    className: "text-text bg-gray-800 font-sans",
  });
}

export { handleSuccess, handleError, handleWarning, handleInfo };
