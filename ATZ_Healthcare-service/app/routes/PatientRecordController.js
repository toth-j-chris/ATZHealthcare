module.exports = function(app) {
    const db = require('../../db/db');
    const dbName = "ATZ"
    const collectionName = "patients"
    const records = "patientRecords"
    const bodyParser = require('body-parser');
    const ObjectID = require('mongodb').ObjectID;

    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    )

    app.use(bodyParser.json())

    app.post('/addnewpatient', (req, res) => {
        const patient = { fName: req.body.fName, lName: req.body.lName, DOB: req.body.DOB }
        let newPatient = new PatientBuilder().setFName(patient.fName).setLName(patient.lName).setDOB(patient.DOB);
        db.initialize(dbName, collectionName, dbCollection => {
            dbCollection.insertOne(newPatient, function(err) {
                const id = newPatient._id;
                db.initialize(dbName, records, recordCollection => {
                    const med_hist = []
                    const treat = []
                    const appt = []
                    const prescription = []
                    newRecord = { patientID: id, medical_history: med_hist, treatments: treat, appointments: appt, prescriptions: prescription, notes: "" }
                    recordCollection.insertOne(newRecord);
                }, err => {
                    res.send({ 'error': 'An error has occurred creating the patient record' })
                })
            });
        })
        res.send({ 'status': 'success' });
    }, err => {
        res.send({ 'error': 'An error has occurred' });
    });

    app.get('/getpatient/:_id', (req, res) => {
        const patient = { _id: req.params._id }
        db.initialize(dbName, collectionName, dbCollection => {
            dbCollection.findOne({}, function(err, result) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                }
                res.send(result);
            });
        });
    });


    app.get('/getpatients', (req, res) => {
        db.initialize(dbName, collectionName, dbCollection => {
            dbCollection.find({}).toArray(function(err, result) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                }
                res.send(result);
            });
        });
    });


    app.get('/getpatientrecord', (req, res) => {
        const _id = new ObjectID(req.query._id)
        db.initialize(dbName, records, recordCollection => {
            recordCollection.findOne({ 'patientID': _id }, function(err, resp) {
                if (err) {
                    console.log("error getting record");
                } else {
                    db.initialize(dbName, collectionName, patientCollection => {
                        patientCollection.findOne({ '_id': _id }, function(err, response) {
                            if (err) {
                                res.send(false)
                            } else {
                                const objects = { record: resp, patient: response }
                                res.send(objects);
                            }
                        })
                    })
                }
            })
        })
    })


    app.put('/updaterecord', (req, res) => {
        db.initialize(dbName, records, dbCollection => {
            var updatedObject = req.body.params.updatedRecord
            updatedObject._id = ObjectID(updatedObject._id)
            updatedObject.patientID = ObjectID(updatedObject.patientID)
            dbCollection.save(updatedObject, function(err, resp) {
                if (err) {
                    res.send({success:false})
                    console.log(err)
                } else {
                    res.send({success:true})
                    console.log("Updated successfully");
                }
            })
        })
    })
}

class Patient {
    constructor(fName, lName, DOB) {
        this.fName = fName;
        this.lName = lName;
        this.DOB = DOB;
    }
}

let PatientBuilder = function() {

    let fName;
    let lName;
    let DOB;

    return {
        setFName: function(fName) {
            this.fName = fName;
            return this;
        },
        setLName: function(lName) {
            this.lName = lName;
            return this;
        },
        setDOB: function(DOB) {
            this.DOB = DOB;
            return this;
        },
        build: function() {
            return new Patient(fName, lName, DOB);
        }
    };
};