module.exports = function(app) {
    const db = require('../../db/db');
    const dbName = "ATZ"
    const collectionName = "users"


    app.get('/checkcredentials', (req, res) => {

        db.initialize(dbName, collectionName, dbCollection => {
            dbCollection.findOne({ 'username': req.query.username, 'password': req.query.password }, function(err, result) {
                if (result) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            })
        })
    })

    app.post('/newuser', (req, res) => {
        const credentials = { 'username': req.body.username, 'password': req.body.password }
        db.initialize(dbName, collectionName, dbCollection => {
            if (dbCollection.findOne(credentials).count() <= 0) {
                dbCollection.insertOne(credentials)
                res.send("Account created")
            } else {
                res.send("Credentials already used");
            }
        })
    })
}