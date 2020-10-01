import React,{useState, useContext} from "react";
import { useFormState } from "react-use-form-state";
import {Button} from 'react-bootstrap'
import {PatientRecordContext} from './PatientPage'
import {updateRecord} from '../Util/AxiosUtil'
import History from './History'

function Prescriptions(props) {
  const { patientRecord, setPatientRecord, currentAppointment, ...rest} = useContext(PatientRecordContext)
  const [formState, { text }] = useFormState();
  const [isSuccess, setIsSuccess] = useState(false)
  const today = new Date()
  const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  
  const handleSubmit = e =>{
    var patRecord = patientRecord
    patRecord.record.prescriptions[currentAppointment] = date + ": " + formState.values.newPrescription
    setPatientRecord(patRecord)
    updateRecord(patientRecord, setPatientRecord, patientRecord.patient._id)
    console.log(patientRecord)
    setIsSuccess(true)
  }
  console.log(currentAppointment)
  console.log(patientRecord.record.appointments.length )
  return (
    <div className="prescriptionText">
      <h1>Prescriptions</h1>
      <br />
      <span className="inline-form">
        <input {...text("newPrescription")} className="form-control"  placeholder="Add a Prescription"/>
        <Button variant="outline-primary" className="form" onClick={e => handleSubmit(e)} disabled={currentAppointment < patientRecord.record.appointments.length - 1 ? "disabled" : null}>Prescribe</Button>
      </span>
        {isSuccess ? <p style={{color:"green"}}><i>Prescription Added Successfully</i></p> : ''}
        <br />
        <b>Prescription History:</b>
        <History />
    </div>
  );
}

export default Prescriptions;
