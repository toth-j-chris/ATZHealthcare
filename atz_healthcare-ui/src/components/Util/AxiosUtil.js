import axios from "axios";

const endpoint = "http://localhost:8080";

export function checkCredentials(setValidCredentials, username, password) {
  axios
    .get(endpoint + "/checkcredentials", {
      params: { username: username, password: password },
    })
    .then((response) => {
      console.log(response);
      setValidCredentials(response.data);
    })
    .catch((error) => console.log(error));
}

export function getPatientList(setPatientList) {
  axios
    .get(endpoint + "/getpatients")
    .then((response) => {
      setPatientList(response.data);
    })
    .catch((error) => console.log(error));
}

export function updateRecord(record, setRecord, id) {
  axios
    .put(endpoint + "/updaterecord", { params: { updatedRecord: record.record } })
    .then((response) => {
      console.log(response);
      getPatientRecord(setRecord, id);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getPatientRecord(setPatientRecord, patientId) {
  axios
    .get(endpoint + "/getPatientRecord", { params: { _id: patientId } })
    .then((response) => {
      setPatientRecord(response.data);
    })
    .catch((error) => console.log(error));
}

export function getPatientAppointments(setPatientAppointments, patientId) {
  axios.get(endpoint + "/patientappointment", { params: { _id: patientId } })
    .then(response => {
      setPatientAppointments(response.data)
    })
    .catch(error => console.log(error))
}

export function addNewPatient(newPatient) {
  axios
    .post(endpoint + "/addnewpatient", newPatient)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function newAppointment(appt, setAppointmentList) {
  axios
    .post(endpoint + "/addnewappointment", appt)
    .then((response) => {
      console.log(response);
      getAppointmentList(setAppointmentList);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getAppointmentList(setAppointmentList) {
  axios
    .get(endpoint + "/getappointments")
    .then((response) => {
      setAppointmentList(response.data);
    })
    .catch((error) => console.log(error));
}
