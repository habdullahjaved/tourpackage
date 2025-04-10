"use client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DateModal from "./DateModal";
import PicModal from "./PicModal";

function ModalTest() {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  //
  return (
    <div>
      <Button onClick={() => setShowDateModal(true)}>Open Date Modal</Button>
      <Button onClick={() => setShowPicModal(true)}>Open Pic Modal</Button>

      <DateModal show={showDateModal} onHide={() => setShowDateModal(false)} />
      <PicModal show={showPicModal} onHide={() => setShowPicModal(false)} />
    </div>
  );
}

export default ModalTest;
