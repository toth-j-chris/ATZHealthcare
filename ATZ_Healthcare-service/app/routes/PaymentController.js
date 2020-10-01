module.exports = function (app) {
    const db = require('../../db/db');
    const dbName = "ATZ"
    const collectionName = "appointments"

     app.post('/transferFunds', (req, res) => {
        const info = { bankInfo: req.body.bankInfo, apptId: req.body.apptId, shouldGenerateReceipt: req.body.shouldGenerateReceipt}
        res.send({"success": true})
    })
};