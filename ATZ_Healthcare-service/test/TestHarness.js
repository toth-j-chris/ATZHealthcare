//run this in a separate terminal window:
// node -e 'require("./test").init()'
const axios = require('axios');

module.exports.init = function main() {
    /*
        
        axios.post('http://localhost:8080/transferFunds', {
                bankInfo: 'testBank',
                apptId: 'testId',
                shouldGenerateReceipt: true
            })
            .then(function(response) {
                console.log("Testing POST of bank information...\nSuccess")
                console.log(response.data);
            })
            .catch(function(error) {
                console.log("Testing POST of bank information...\nFailure")
                console.log(error);
            });

        
                axios.get('http://localhost:8080/patientInvoice/5e5c6d8a6a36e2056453deca')
                    .then(function(response) {
                        console.log("Testing retrieval of appointment data to be used in a receipt or invoice...\nSuccess")
                        console.log(response.data);
                    })
                    .catch(function(error) {
                        console.log("Testing retrieval of appointment data to be used in a receipt or invoice...\nFailure")
                        console.log(error)
                    });


                axios.get('http://localhost:8080/getpatient/Steve')
                    .then(response => {
                        console.log('Finding a patient...');
                        console.log(response.data);
                    }).catch(error => {
                        console.log('Finding a patient...');
                        console.log(error);
                    })

                const patient = {
                    fName: 'Reed',
                    lName: 'McGarvey',
                    DOB: '5/27/1998'
                }

                axios.post('http://localhost:8080/addnewpatient', patient)
                    .then(response => {
                        console.log('Adding a new patient record...');
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log('Adding a new patient record...');
                        console.log(error);
                    })

                axios.get('http://localhost:8080/getpatient/Steve')
                    .then(response => {
                        console.log('Getting patient records...');
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log('Getting patient records...');
                        console.log(error);
                    })

    axios.get('http://localhost:8080/getpatients')
        .then(response => {
            console.log('Getting patient records...');
            console.log(response.data);
        })
        .catch(error => {
            console.log('Getting patient records...');
            console.log(error);
        })


    axios.get('http://localhost:8080/getappointments')
        .then(response => {
            console.log('Getting appointment records...');
            console.log(response.data);
        })
        .catch(error => {
            console.log('Getting appointment records but error...');
            console.log(error);
        })
*/
    // axios.put('http://localhost:8080/updateappointment', {
    //         _id: '5e9b4d2c1c9d4400005e1fd9',
    //         newdate: "2014-01-22T14:56:59.301Z",
    //         newreason: "He is stuff"
    //     })
    //     .then(response => {
    //         console.log('Updating appointment records...');
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log('Updating appointment records but error...');
    //         console.log(error);
    //     })


    axios.get('http://localhost:8080/getappointments')
        .then(response => {
            console.log('Getting appointment records...');
            console.log(response.data);
        })
        .catch(error => {
            console.log('Getting appointment records but error...');
            console.log(error);
        })
}