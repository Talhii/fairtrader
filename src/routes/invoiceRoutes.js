var express = require('express');
var router = express();

//Importig controller for interacting with database
const invoiceController = require('../controllers/invoice/invoiceController')

const invoiceDashboardController = require('../controllers/invoice/invoiceDashboardController')



router.post('/createInvoice',invoiceController.upload, invoiceController.create);
router.get('/', invoiceDashboardController.history)
router.get('/purchashHistory')

module.exports = router;