import React from "react";
import "./Modal.css";

interface ModalProps {
  children: JSX.Element | null;
  title: string | null;
  isVisible: Boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  isVisible,
  onClose,
  onSubmit,
}) => {
  return (
    <div
      className="modal"
      style={isVisible ? { display: "block" } : {}}
      onClick={() => console.log("CLOSE")}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-content">{children}</div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
          <button className="primary-button" onClick={onSubmit}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
