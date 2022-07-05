var express = require('express');
var route = express();

//Importig controller for interacting with database
const userController = require('../controllers/userController')


// creating userController routes
route.get('/users',userController.list);
route.post('/createUser',userController.create);
route.post('/updateUser',userController.update);
route.get('/searchUsers',userController.searchUsers);
route.get('/searchUsersByIndustry',userController.searchUsersByIndustry);
route.post('/uploadImage',userController.upload , userController.uploadImage);
route.delete('/deleteImage',userController.deleteImage);


// creating invoiceController routes




module.exports = route;