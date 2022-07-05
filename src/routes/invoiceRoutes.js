var express = require('express');
var route = express();

//Importig controller for interacting with database
const invoiceController = require('../controllers/invoiceController')



route.post('/createInvoice',invoiceController.upload,invoiceController.create);

//route.post('/uploadInvoice',invoiceController.upload , invoiceController.uploadInvoice);



module.exports = route;