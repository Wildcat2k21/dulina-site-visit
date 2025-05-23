import './styles/modalWindow.css';

export default function ModalWindow({ text, onClose }) {
  return (
    <div className="modal-window-background" onClick={onClose}>
      <div className="modal-window">
        <div className="modal-window__top">
          <button className="modal-window__close" style={{ cursor: 'pointer' }}>
            &#10005;
          </button>
        </div>
        <div className="modal-window__content">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
