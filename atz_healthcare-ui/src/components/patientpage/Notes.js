import React, { useContext, useState } from 'react'
import { useFormState } from "react-use-form-state";
import { Button } from 'react-bootstrap'
import { PatientRecordContext } from './PatientPage'
import { updateRecord } from '../Util/AxiosUtil'
import NoteHistory from './NoteHistory'

function Notes() {
  const { patientRecord, setPatientRecord, currentAppointment, setCurrentAppointment } = useContext(PatientRecordContext)
  const [formState, input] = useFormState();
  const [showForm, setShowForm] = useState(false)
  const today = new Date()
  const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

  const submitNote = e => {
    var patRecord = patientRecord
    patRecord.record.notes = patRecord.record.notes + ' ' + date + ': ' + formState.values.newNote + '1/'
    setPatientRecord(patRecord)
    updateRecord(patientRecord, setPatientRecord, patientRecord.patient._id)
    console.log(patientRecord)
  }
  const submitTreatment = e => {
    var patRecord = patientRecord
    patRecord.record.treatments[currentAppointment] = formState.values.newTreatment
    setPatientRecord(patRecord)
    updateRecord(patientRecord, setPatientRecord, patientRecord.patient._id)
    console.log(patientRecord)
  }
  return (
    <div className="notesText">
      <h1>Notes</h1>
      <p><b>Treatment: </b>{patientRecord.record.treatments[currentAppointment]}</p>
      {showForm ?
        <span className="inline-form">
          <input {...input.text('newTreatment')} className="form-control" placeholder="New Treatment" />
          <Button variant="outline-primary" className="form" onClick={e => { submitTreatment(e) }}>Add</Button>
        </span>
        :
        <Button variant="outline-primary" size="sm" onClick={e => { setShowForm(true) }}>Add New Treatment</Button>
      }
      <br /><br />
      <b>Notes History: </b>
      <div className="scrollable">
        <NoteHistory />
      </div>
      <br />
      <div className="noteTextArea">
        <p>Add a new note for <b>{date}</b>:</p>
        <textarea {...input.textarea('newNote')} placeholder="New Note" className="form-control" style={{ resize: "none" }} /> <br />
      </div>
      <Button variant="primary" onClick={e => { submitNote(e) }}>Add Note</Button>
    </div>
  )
}
export default Notes