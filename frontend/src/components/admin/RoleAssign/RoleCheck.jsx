import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function RoleCheck({ show, handleClose, responseData }) {
  return (
    <div>
         <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>API Response</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
