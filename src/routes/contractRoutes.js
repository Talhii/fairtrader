var express = require('express');
var router = express();

//Importig controller for interacting with database
const contractController = require('../controllers/contractController')



router.post('/createContract/:invoiceId', contractController.uploadfiles, contractController.create);

module.exports = router;