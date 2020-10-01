import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import PatientDash from "./PatientDash";
import AppointmentDash from "./AppointmentDash";
import { getPatientList } from '../Util/AxiosUtil'
import "./dashboard.css";

export const PatientContext = React.createContext(null)

function Dashboard() {

  const [patientList, setPatientList] = useState([]);
  useEffect(() => { getPatientList(setPatientList) }, [])
  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginLeft: "20px" }}>
        <PatientContext.Provider value={{ patientList, setPatientList }}>
          <div className="left">
            <PatientDash />
          </div>
          <div className="right">
            <AppointmentDash />
          </div>
        </PatientContext.Provider>
      </div>
    </div>
  );
}
export default Dashboard;