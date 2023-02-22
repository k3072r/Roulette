import { createPortal } from "react-dom";

const Modal = ({ children, closeModal }) => {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9998,
      }}
      onClick={ closeModal }
    >
        <div
         style={{
            position: "relative",
            top: '-20%',
         }}>
            {children}
        </div>
    </div>,
    document.getElementById('feverPortal')
  );
};

export default Modal;