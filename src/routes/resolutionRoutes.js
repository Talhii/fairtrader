var express = require('express');
var router = express();




//Importig controller for interacting with database
const resolutionController = require('../controllers/resolutionController')



router.post('/selectResolution',resolutionController.selectResolution);


module.exports = router;