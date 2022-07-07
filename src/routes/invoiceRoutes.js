var express = require('express');
var router = express();

//Importig controller for interacting with database
const invoiceController = require('../controllers/invoiceController')



router.post('/createInvoice',invoiceController.upload, invoiceController.create);

module.exports = router;