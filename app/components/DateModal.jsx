import { Modal } from "react-bootstrap";
import { useEffect } from "react";

function DateModal({ show, onHide }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("date-modal-open");
    } else {
      document.body.classList.remove("date-modal-open");
    }

    return () => {
      document.body.classList.remove("date-modal-open");
    };
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      centered
      className="date-modal"
    >
      <Modal.Header>
        <Modal.Title>Date Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Select a Date</h4>
        <input type="date" className="date-input" />
      </Modal.Body>
    </Modal>
  );
}

export default DateModal;
