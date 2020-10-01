import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Prescriptions from "./Prescriptions";
import Notes from "./Notes";
import { getPatientRecord, getAppointmentList, getPatientAppointments } from "../Util/AxiosUtil";
import { useParams } from "react-router-dom";
import "../css/patientPage.css";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AppointmentCardList from "./AppointmentCardList"

export const PatientRecordContext = React.createContext(null);

function PatientPage() {
  const [patientRecord, setPatientRecord] = useState({})
  const [currentAppointment, setCurrentAppointment] = useState(0)
  const [patientAppointments, setPatientAppointments] = useState([])
  const [selected, setSelected] = useState(0)

  let { id } = useParams();
  useEffect(() => { getPatientAppointments(setPatientAppointments, id) }, [])
  useEffect(() => { getPatientRecord(setPatientRecord, id) }, []);
  if (!patientRecord.record) {
    return (
      <div className="loading">
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={200}
          width={200}
        />
      </div>
    );
  } else if (patientRecord.record === null) {
    return <div>Patient Record Not Found</div>;
  } else {
    return (
      <div>
        <Navbar />
        <div className="patientPageContainer">
          <PatientRecordContext.Provider
            value={{ patientRecord, setPatientRecord, currentAppointment, setCurrentAppointment, patientAppointments, setPatientAppointments, selected, setSelected }}
          >
            <div className="patientInfoContainer">
              <div className="infoLeft">
                Name:
                <br />
                DOB:
              </div>
              <div className="infoRight">
                {patientRecord.patient.fName +
                  " " +
                  patientRecord.patient.lName}
                <br />
                {patientRecord.patient.DOB}
              </div>
            </div>
            <div className="columnContainer">
              <div className="appointmentColumn">
                <h1>Appointments</h1>
                <AppointmentCardList />
              </div>
              <div className="notesColumn">
                <Notes />
              </div>
              <div className="prescriptionColumn">
                <Prescriptions />
              </div>
            </div>
          </PatientRecordContext.Provider>
        </div>
      </div>
    );
  }
}

export default PatientPage;
