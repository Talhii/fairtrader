var express = require('express');
var router = express();

//Importig controller for interacting with database
const invoiceController = require('../controllers/invoice/invoiceController')

const invoiceDashboardController = require('../controllers/invoice/invoiceDashboardController')
const purchaseHistoryController = require('../controllers/invoice/purchaseHistoryController')

const salesHistoryController = require('../controllers/invoice/salesHistoryController')





router.post('/createInvoice',invoiceController.upload, invoiceController.create);

router.get('/', invoiceDashboardController.history)

router.get('/purchaseHistory/unpaid', purchaseHistoryController.unpaid)
router.get('/purchaseHistory/unpaid/:invoiceId', purchaseHistoryController.unpaidWithInvoiceId)
router.get('/purchaseHistory/paid', purchaseHistoryController.paid)
router.get('/purchaseHistory/paid/:invoiceId', purchaseHistoryController.paidWithInvoiceId)


router.get('/salesHistory/unpaid', salesHistoryController.unPaid)
router.get('/salesHistory/unpaid/:invoiceId', salesHistoryController.unPaidWithInvoiceId)
router.get('/salesHistory/paid', salesHistoryController.paid)
router.get('/salesHistory/paid/:invoiceId', salesHistoryController.paidWithInvoiceId)



module.exports = router;