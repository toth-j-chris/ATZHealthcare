import React from 'react'
// import { useFormState } from 'react-use-form-state'
import { Modal, Button } from 'react-bootstrap'

function PatientInfoModal(props) {

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>{props.fName} {props.lName}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    First Name: {props.fName} <br />
                    Last Name: {props.lName} <br />
                    Date of Birth: {props.dob}
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={e => props.updateModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PatientInfoModal