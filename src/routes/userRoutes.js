var express = require('express');
var router = express();

//Importig controller for interacting with database
const userController = require('../controllers/userController')


// profile routers
//router.get('/list',userController.list);
router.post('/createUser',userController.create);
router.post('/loginUser',userController.login);

router.put('/updateUser',userController.update);
router.put('/uploadImage',userController.upload , userController.uploadImage);
router.delete('/deleteImage',userController.deleteImage);

//search and display
router.post('/searchUsers',userController.searchUsers);

router.get('/searchUsersByWallet/:walletaddress',userController.searchUsersByWallet);
router.get('/getUsersByWallet/:walletaddress',userController.searchUsersByWallet);
router.get('/getUsersDataByWalletAddress/:walletaddress',userController.searchUsersByWallet);

module.exports = router;