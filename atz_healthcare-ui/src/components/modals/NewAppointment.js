import React, { useState, useContext } from 'react'
import { useFormState } from 'react-use-form-state'
import { Modal, Button } from 'react-bootstrap'
import { newAppointment } from '../Util/AxiosUtil'
import { ApptContext } from '../dashboard/AppointmentDash'
import { PatientContext } from '../dashboard/Dashboard'
import Autocomplete from "react-autocomplete";

function PatientInfoModal(props) {
    const { setAppointmentList, ...rest } = useContext(ApptContext);
    const { patientList, ...rest1 } = useContext(PatientContext);
    const [selectedPatient, setSelectedPatient] = useState()
    const today = new Date()
    today.setHours(props.time)
    today.setMinutes(0)
    today.setSeconds(0)

    const [formState, input] = useFormState();
    const handleSubmit = e => {
        var appt = {
            patientID: formState.values.patId,
            date: today,
            reason: formState.values.reason
        }
        // console.log(appt)
        newAppointment(appt, setAppointmentList)
        alert('New appointment added!')
    }
    const patientListBox = <input {...input.text("patId")} />
    // console.log(formState.values)
    return (
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule An Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Autocomplete // https://github.com/reactjs/react-autocomplete
                        inputProps={{
                            className: "form-control",
                            placeholder: "Patient Name"
                        }}
                        items={patientList}
                        shouldItemRender={(item, value) =>
                            item.lName.toLowerCase().indexOf(value.toLowerCase()) > -1
                        }
                        getItemValue={item => item.lName}
                        renderItem={(item, highlighted) => (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: highlighted ? "#eee" : "transparent"
                                }}
                            >
                                {item.lName}, {item.fName}
                                {/*describes what will populate in the box */}
                            </div>
                        )}
                        value={selectedPatient}
                        onChange={e => {
                            setSelectedPatient(e.target.value);
                        }}
                        onSelect={(value, item) => {
                            setSelectedPatient(value + ', ' + item.fName);
                            formState.values.patId = item._id;
                            // console.log(value);
                        }}
                    />
                    <h3>Your new appointment will be scheduled on:</h3>
                    <strong>{today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()} At {props.time >= 13 ? props.time - 12 : props.time}:00</strong><br /><br />
                    <textarea {...input.textarea('reason')} placeholder="Reason for appointment" className="form-control" />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={e => props.updateModal(false)}>Close</Button>
                <Button variant="primary" onClick={e => handleSubmit(e)}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PatientInfoModal