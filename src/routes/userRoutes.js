var express = require('express');
var router = express();

//Importig controller for interacting with database
const userController = require('../controllers/userController')


// profile routers
//router.get('/list',userController.list);
router.post('/createUser',userController.create);
router.post('/loginUser',userController.login);

router.put('/updateUser',userController.update);
router.post('/uploadImage',userController.upload , userController.uploadImage);
router.delete('/deleteImage',userController.deleteImage);

//search and display
router.get('/searchUsers',userController.searchUsers);
router.get('/searchUsersByIndustry',userController.searchUsersByIndustry);
router.get('/searchUsersByEmail',userController.searchUsersByEmail);
router.get('/searchUsersByLookingFor',userController.searchUsersByLookingFor);
router.get('/displayUserBySearchPreference',userController.displayUserBySearchPreference);

router.get('/searchUsersByWallet/:walletaddress',userController.searchUsersByWallet);
router.get('/getUsersByWallet',userController.searchUsersByWallet);
router.get('/getUsersDataByWalletAddress',userController.searchUsersByWallet);

module.exports = router;