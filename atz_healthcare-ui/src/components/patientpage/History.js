import React, { useContext } from 'react'
import {PatientRecordContext} from './PatientPage'

export function History() {
    const { patientRecord, currentApointment, ...rest} = useContext(PatientRecordContext)
    var strings = []

    patientRecord.record.prescriptions.map(element => {
        strings.push(<p key={element}>{element}</p>)
    })

    return (
        strings.map(element =>{
            return element
        })
    )
}

export default History