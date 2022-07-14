var express = require('express');
var router = express();

//Importig controller for interacting with database

const { upload } = require("../config/Multer");
const mediatorController = require('../controllers/mediator/mediatorController');


router.get("/Passport/:id", mediatorController.PassportGet);
router.put("/Passport/:id", upload.array("passport"), mediatorController.PassportController);
router.delete("/Passport/:id", mediatorController.PassportDelete);



router.get("/Documents/:id", mediatorController.DocumentsGet);
router.put("/Documents/:id", upload.array("document"), mediatorController.DocumentsController);
router.delete("/Documents/:id", mediatorController.DocumentsDelete);


router.get("/IdCard/:id", mediatorController.IdCardGet);
router.put("/IdCard/:id", upload.array("idCard"), mediatorController.IdCardController);
router.delete("/IdCard/:id", mediatorController.IdCardDelete);



router.get("/Approve/", mediatorController.ApprovedGet);
router.get("/Approve/approved", mediatorController.ApprovedGet);
router.put("/Approve/:id", mediatorController.ApprovedController);

router.post('/Profile/:id', mediatorController.createProfile);




module.exports = router;