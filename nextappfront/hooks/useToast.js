// import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useToast() {
  const toastError = ({ message, onClose }) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose,
    });
  };
  const toastPromise = async (promise, options) => {
    return await toast.promise(
      promise,
      options || {
        pending: 'Uploading Image...',
        success: 'Image Uploaded!',
        error: 'Image upload failed!',
      }
    );
  };
  const toastMsg = ({ message, onClose }) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose,
    });
  };
  const Toast = () => (
    <ToastContainer
      position="top-center"
      autoClose={200}
      hideProgressBar={true}
      newestOnTop={false}
      limit={1}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
  return { toastMsg, toastError, toastPromise, Toast };
}

export default useToast;
