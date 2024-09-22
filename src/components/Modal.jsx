import { XCircleIcon } from "@heroicons/react/24/outline";
import { Children } from "react";

function Modal({ isOpen, setIsOpen, children }) {
  if (!isOpen) return null;
  return (
    <div>
      <div className="backdrop" onClick={() => setIsOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">hello every body</h2>
          <button onClick={() => setIsOpen(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
