import React,{useState, useContext} from "react"
import {useHistory} from 'react-router-dom'
import AddNewPatient from '../modals/AddNewPatient'
import PatientInfoModal from '../modals/PatientInfoModal'
import { PatientContext } from '../dashboard/Dashboard'
import { Button } from "react-bootstrap";
import { MDBDataTable } from 'mdbreact';

function PatientDash() {
    const [patientModalOpen, updatePatientModal] = useState(false);
    const [infoModalOpen, updateInfoModal] = useState(false);
    const { patientList, ...rest } = useContext(PatientContext);
    const history = useHistory()
    
    for (let i =0; i<patientList.length; i++){
        patientList[i].button = <Button variant="primary" size="sm" onClick={(e) => selectPatient(patientList[i])}>More Info</Button>
        console.log(patientList[i])
    }
    const data = {
        columns: [
            {
                label: ' ID',
                field: '_id',
                sort: 'asc',
                width: 150
            },
            {
                label: ' First Name',
                field: 'fName',
                sort: 'asc',
                width: 150
            },
            {
                label: ' Last Name',
                field: 'lName',
                sort: 'asc',
                width: 150
            },
            {
                label: ' Date of Birth',
                field: 'DOB',
                sort: 'asc',
                width: 150
            },
            {
                label: '',
                field: 'button',
                width: 400
            }
        ],
        rows: patientList
    }
    const selectPatient = patient =>{
        history.push('/patient/' + patient._id)
    }

    function handleClick() {
        updateInfoModal(true)
    }
    return (
        <div>
            <div style={{ float: "left"}}>
                <h1> Patient Records</h1>
                <Button style={{ float: "left" }} onClick={e => updatePatientModal(true)}>+ Add New Patient</Button>
                <div style={{ padding: "50px 0px" }}>
                    <MDBDataTable
                        striped
                        bordered
                        medium
                        data={data}
                    />
                </div>
            </div>
            <AddNewPatient show={patientModalOpen} updateModal={updatePatientModal} />
            <PatientInfoModal show={infoModalOpen} updateModal={updateInfoModal} fName="Charles" lName="Norris" />
        </div>
    )
}

export default PatientDash