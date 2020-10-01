module.exports = app => {
    const db = require('../../db/db');
    const dbName = "ATZ"
    const collectionName = "appointments"

     app.get("/patientInvoice/:id", (req, res) => {
        var id = require('mongodb').ObjectID(req.params.id);
        db.initialize(dbName, collectionName,  dbCollection => {
            dbCollection.find(id).toArray((error, result) => {
                if (error) throw error
                res.send({result});
            });
        }, err => {
            res.send({ 'error': 'An error has occurred' });
        })
    })
};