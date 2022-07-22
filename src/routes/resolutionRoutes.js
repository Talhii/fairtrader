var express = require('express');
var router = express();




//Importig controller for interacting with database
const resolutionController = require('../controllers/resolutionController')



router.post('/selectResolution/:invoiceId',resolutionController.selectResolution);
router.post('/displayMeditorWithIndustry/:industry',resolutionController.displayMediatorWithIndustry);


module.exports = router;