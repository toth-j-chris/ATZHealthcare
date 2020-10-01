import React, {useState} from "react";
import AppointmentCardList from "./AppointmentCardList";
import NewAppointment from '../modals/NewAppointment'
import "./dashboard.css";

export const ApptContext = React.createContext(null)

function AppointmentDash() {
  const [modalOpen, setModalOpen] = useState(false)
  const [time, setTime] = useState()
  const [appointmentList, setAppointmentList] = useState([])
  
  return (
    <div>
      <h1>Appointments</h1>

      <div style={{ float: "left", width: "40px", marginTop:"10px" }}>
        {/* this is for the number column */}
        <h3>9</h3>
        <hr />
        <h3>10</h3>
        <hr />
        <h3>11</h3>
        <hr />
        <h3>12</h3>
        <hr />
        <h3>1</h3>
        <hr />
        <h3>2</h3>
        <hr />
        <h3>3</h3>
        <hr />
        <h3>4</h3>
        <hr />
      </div>
      <div style={{float: "right"}}> {/* this is for the appt cards*/}
      <ApptContext.Provider value={{appointmentList, setAppointmentList, setModalOpen, setTime}}>
        <AppointmentCardList  />
        <NewAppointment updateModal={setModalOpen} show={modalOpen} time={time}/>
      </ApptContext.Provider>
      </div>
    </div>
  );
}

export default AppointmentDash;
