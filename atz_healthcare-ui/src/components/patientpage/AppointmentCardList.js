import React, { useContext, useState } from 'react'
import { PatientRecordContext } from './PatientPage'
import AppointmentCard from './AppointmentCard'

function AppointmentCardList(props) {
    
    let cards = []
    const { patientRecord, currentAppointment, setCurrentAppointment, patientAppointments, ...rest } = useContext(PatientRecordContext)
    const patient = patientRecord.patient
    const record = patientRecord.record
    const cardNum = record.appointments.length

    for (let i = 0; i < patientAppointments.length; ++i) {
            cards.push(<AppointmentCard key={i} currAppt={i} />)
    }

    return (
        cards.map(card => {
            return card
        })
    )
}

export default AppointmentCardList