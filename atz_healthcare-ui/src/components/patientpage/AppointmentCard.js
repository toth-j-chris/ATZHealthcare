import React, { useContext, useState } from 'react'
import { PatientRecordContext } from './PatientPage'

function AppointmentCard(props) {
    const { patientRecord, currentAppointment, patientAppointments, setCurrentAppointment, selected, setSelected, ...rest } = useContext(PatientRecordContext)
    const date = new Date(patientAppointments[props.currAppt].date)
    const [ active, toggleActive ] = useState(false)
    date.setHours(date.getHours() + 4)
    if (date.getHours() >= 13) {
        date.setHours(date.getHours() - 12)
    }
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    return (
        <div className={selected === props.currAppt ? "appointmentCard cardActive" : "appointmentCard"} onClick={ e => {
            setSelected(props.currAppt); setCurrentAppointment(props.currAppt);
        }}>
            <div className="apptDate">
                {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
            </div>
            <div className="apptTime">
                {date.getHours()}:{minutes}
            </div>
        </div>
    )
}

export default AppointmentCard