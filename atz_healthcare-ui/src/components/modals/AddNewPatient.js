import React from 'react'
import { useFormState } from 'react-use-form-state'
import { Modal, Button } from 'react-bootstrap'
import { addNewPatient, getPatientList } from '../Util/AxiosUtil'

function AddNewPatient(props) {

    const [formState, { text }] = useFormState()

    function handleSubmit(e) {
        getPatientList()
        let newPatient = formState.values
        addNewPatient(newPatient)
        alert('Added New Patient: ' + formState.values.fName + ' ' + formState.values.lName)
    }

    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Patient</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <form>
                        <b>First Name:</b>
                        <br />
                        <input
                            {...text('fName')} className="form-control"
                        />
                        <br />
                        <b>Last Name:</b>
                        <br />
                        <input
                            {...text('lName')} className="form-control"
                        />
                        <br />
                        <b>Date of Birth:</b>
                        <br />
                        <input
                            {...text('DOB')} className="form-control"
                        />
                    </form>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={e => props.updateModal(false)}>Close</Button>
                <Button variant="primary" onClick={e => handleSubmit(e)}>Add Patient</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNewPatient