const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true }, (err, dbInstance) => {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

function joinPatient(
    dbName,
    masterCollection,
    referenceCollection,
    localf,
    foreignf,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true }, (err, dbInstance) => {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);
        } else {
            const dbObject = dbInstance.db(dbName);
            const joinedObj = dbObject.collection(masterCollection).aggregate([{
                $lookup: {
                    from: referenceCollection,
                    localField: localf,
                    foreignField: foreignf,
                    as: 'patientinfo'
                }
            }]);
            console.log("[MongoDB connection] SUCCESS");
            successCallback(joinedObj);
        }
    })
}

module.exports = {
    initialize,
    joinPatient
};
