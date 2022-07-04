var express = require('express');
var route = express();

//Importig controller for interacting with database
const controller = require('./controller')


// creating routes
route.get('/users',controller.list);
route.post('/createUser',controller.create);
route.post('/updateUser',controller.update);
route.get('/searchUsers',controller.searchUsers);
route.get('/searchUsersByIndustry',controller.searchUsersByIndustry);


route.post('/uploadImage',controller.upload , controller.uploadImage);
route.delete('/deleteImage',controller.deleteImage);


module.exports = route;