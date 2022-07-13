var express = require('express');
var router = express();


//Importig controller for interacting with database
const resetController = require('../controllers/mediator/resetController')

router.post("/", resetController.forget);
router.post("/Change", resetController.change);


module.exports = router;