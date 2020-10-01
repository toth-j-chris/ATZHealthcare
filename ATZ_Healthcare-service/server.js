const express = require('express'); //framework for starting a node server
const bodyParser = require('body-parser'); //helps parse incoming json in request object

const app = express();
const path = require('path');
const cors = require('cors');
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

require('./app/routes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
})