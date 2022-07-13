var express = require('express');
var router = express();

//Importig controller for interacting with database
const mediatorController = require('../controllers/mediator/mediatorController')

const { upload } = require("../config/Multer");
const mediatorContoller = require('../controllers/mediator/mediatorController');


router.get("/Passport/:id", mediatorContoller.PassportGet);
router.put("/Passport/:id", upload.array("passport"), mediatorContoller.PassportController);
router.delete("/Passport/:id", mediatorContoller.PassportDelete);



router.get("/Documents/:id", mediatorContoller.DocumentsGet);
router.put("/Documents/:id", upload.array("document"), mediatorContoller.DocumentsController);
router.delete("/Documents/:id", mediatorContoller.DocumentsDelete);


router.get("/IdCard/:id", mediatorContoller.IdCardGet);
router.put("/IdCard/:id", upload.array("idCard"), mediatorContoller.IdCardController);
router.delete("/IdCard/:id", mediatorContoller.IdCardDelete);



router.get("Approve/", mediatorContoller.ApprovedGet);
router.get("Approve/approved", mediatorContoller.ApprovedGet);
router.put("Approve/:id", mediatorContoller.ApprovedController);



router.post('/register', mediatorController.signup);
router.post('/login', mediatorController.login);
router.post('/Profile/:id', mediatorController.createProfile);




module.exports = router;