module.exports = function (app, db) {
    app.post('/addprescription', (req, res) => { //adding prescription to patient chart in the database
        const prescript = { prescName: req.body };
        db.collection('patient_charts').insert(prescript, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred adding the prescription' });
            } else {
                res.send(result.ops[0]);
            }
        })
    });

    app.get('/viewprescriptions', (req, res) => { //getting patient's prescriptions from a chart
        db.collection('patient_charts').find('prescriptions', (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred finding the prescriptions' });
            } else {
                res.send(result.ops[0]);
            }
        });
    })
}