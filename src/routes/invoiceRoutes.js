var express = require('express');
var router = express();

//Importig controller for interacting with database
const invoiceController = require('../controllers/invoiceController')

const invoiceDashboardController = require('../controllers/invoiceDashboardController')



router.post('/createInvoice',invoiceController.upload, invoiceController.create);
router.get('/', invoiceDashboardController.history)


module.exports = router;