import { Modal } from "react-bootstrap";
import { useEffect } from "react";

function PicModal({ show, onHide }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("pic-modal-open");
    } else {
      document.body.classList.remove("pic-modal-open");
    }

    return () => {
      document.body.classList.remove("pic-modal-open");
    };
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="pic-modal">
      <Modal.Header>
        <Modal.Title>Picture Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Upload Picture</h4>
        <input type="file" />
      </Modal.Body>
    </Modal>
  );
}

export default PicModal;
