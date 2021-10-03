import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Button from './Button';

function ConfirmModal({
  title = 'Confirm submission',
  body = 'Are you sure?',
  modalOpen,
  setModalOpen,
  setConfirm,
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  });
  const modalContent = modalOpen ? (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen px-5 bg-gray-300">
      <div className="w-full rounded-lg bg-white z-50 sm:w-2/3 md:w-1/2 lg:w-1/4">
        <div className="flex items-center w-full p-3 rounded-t-lg bg-primary text-lg text-white">
          {title}
        </div>

        <div className="w-full h-36 p-5 text-lg">{body}</div>
        <div className="flex justify-center items-center gap-8 w-full mb-5">
          <Button
            width={24}
            widthXS={20}
            height={10}
            textSizeLG="sm"
            rounded
            onClick={() => {
              setConfirm(true);
              setModalOpen(false);
            }}
          >
            Confirm
          </Button>
          <Button
            width={24}
            widthXS={20}
            height={10}
            textSizeLG="sm"
            rounded
            onClick={() => {
              setConfirm(false);
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    ReactDOM.createPortal(modalContent, document.getElementById('modal'));
  }
  return modalContent;
}

export default ConfirmModal;
