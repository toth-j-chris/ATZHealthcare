const paymentController = require('./PaymentController');
const prescriptionController = require('./PrescriptionController');
const invoiceController = require('./InvoiceController');
const patientRecordController = require('./PatientRecordController');
const appointmentController = require('./appointmentController');
const loginController = require('./LoginController')
module.exports = function(app) {
    paymentController(app); // Other route groups could go here, in the future
    prescriptionController(app);
    invoiceController(app);
    patientRecordController(app);
    appointmentController(app);
    loginController(app);
};