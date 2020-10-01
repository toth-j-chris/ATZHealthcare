import React, { useContext } from 'react'
import { PatientRecordContext } from './PatientPage'

export function NoteHistory() {
    const { patientRecord, currentApointment, ...rest } = useContext(PatientRecordContext)
    var result = patientRecord.record.notes.match(/(\d\/\d{1,2}\/\d{4}:\s.+?(?=\d\/))/g)
    var formatted = []
    console.log(result)
    if (result === null) {
        result = [''] 
    }
    for (let element of result) {
        console.log(element)
        formatted.push(<span key={element}><p>{element}</p></span>)
    }

    return (
        formatted.map(element => {
            return element
        })
    )
}

export default NoteHistory