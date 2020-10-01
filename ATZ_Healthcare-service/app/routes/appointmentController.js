module.exports = function(app) {
    const db = require('../../db/db');
    const ObjectID = require('mongodb').ObjectID;
    const dbName = "ATZ"
    const appointmentsCollection = "appointments"
    const referenceCollection = "patients"
    const recordCollection = "patientRecords"
    const bodyParser = require('body-parser');

    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    )

    app.use(bodyParser.json())

    app.post('/addnewappointment', (req, res) => {
        var date = new Date(req.body.date)
        date.setHours(date.getHours() - 4)
        const appointment = { patientID: ObjectID(req.body.patientID), date: date, reason: req.body.reason };
        db.initialize(dbName, appointmentsCollection, dbCollection => {
            dbCollection.insertOne(appointment, function(err) {
                const apptid = appointment._id;
                db.initialize(dbName, recordCollection, dbRecords => {
                    dbRecords.findOne({ "patientID": appointment.patientID }, function(err, res) {
                        if (err) {
                            console.log("error finding patient");
                            console.log(appointment.patientID);
                            console.log(res);
                        } else {
                            dbRecords.updateOne({ "_id": res._id }, {
                                $push: {
                                    "appointments": apptid
                                }
                            })
                        };
                    });
                })
            })
            res.send({ 'status': 'success' });
        }, err => {
            res.send({ 'error': 'An error has occured' });
        });
    });

    app.get('/getappointments', (req, res) => {
        db.joinPatient(dbName, appointmentsCollection, referenceCollection, "patientID", "_id", dbCollection => {
            dbCollection.toArray(function(err, result) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                }

                //to see the json as a string for quick understanding, un-comment code here
                /*
                console.log(JSON.stringify(result));
                */
                res.send(result);
            });
        })
    })


    //send this a JSON object that contains {_id: <_id of appointment>, newdate: <new date-object>, newreason: <new reason string>}
    app.put('/updateappointment', (req, res) => {
            db.initialize(dbName, appointmentsCollection, dbCollection => {

                const query = dbCollection.findOne({ _id: req.params._id });

                const newValues = { $set: { date: new Date(req.body.newdate), reason: req.body.newreason } };
                dbCollection.updateOne(query, newValues, function(err, res) {
                    if (err) {
                        res.send({ 'error': 'An error has occured' });
                    } else {
                        console.log("appointment updated");
                    }
                })
                res.send({ 'status': 'success' });
            })
        })
        //takes in _id to delete that appointment
    app.put('/deleteppointment', (req, res) => {
        db.initialize(dbName, appointmentsCollection, dbCollection => {

            const query = dbCollection.findOne({ _id: req.params._id });

            dbCollection.deleteOne(query, function(err, res) {
                if (err) {
                    res.send({ 'error': 'An error has occured' });
                } else {
                    res.send("appointment deleted");

                }
            })
            res.send({ 'status': 'success' });
        })
    })

    app.get('/patientappointment', (req, res) => {
        db.initialize(dbName, appointmentsCollection, dbCollection => {
            const id = new ObjectID(req.query._id)
            dbCollection.find({ "patientID": id }, function(err, resp) {
                if (err) {
                    res.send(err);
                } else {
                    resp.toArray(function(err, response) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(response);
                        }
                    })
                }
            })
        })
    })

}