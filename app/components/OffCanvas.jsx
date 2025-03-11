import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

const OffCanvas = ({
  title,
  show,
  setShow,
  handleClose,
  handleShow,
  setShowModal,
  price,
}) => {
  // const x = 2
  // const y = 6
  // console.log(4.4/2) //2.2
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        scroll
        backdrop={false}
        style={{ height: "75px" }}
      >
        <Offcanvas.Body>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Offcanvas.Title>{title}</Offcanvas.Title>
            </div>
            <div className="col-sm-12 col-md-6 text-end ">
              <div className="d-flex justify-content-end align-items-center">
                <p className="me-2">Starting from {price} AED</p>
                <Button variant="success" onClick={() => setShowModal(true)}>
                  Check Availability
                </Button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvas;
