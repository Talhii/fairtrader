//import sequelize
var Sequelize = require('sequelize');
const multer = require('multer')
const path = require('path')

const controller = {}

// import model
var Users = require('./models/Users');

const { Op } = require("sequelize");

controller.list = async (req, res) => {

  const response = await Users.findAll()
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })
  res.json(response);

}

controller.create = async ( req, res) =>{

  try {

    const response = await Users.create({
      image : "not set",
      country: req.body.country,
      city: req.body.city,
      zipcode: req.body.zipcode,
      address: req.body.address,
      language: req.body.language,
      email : req.body.email,
      industry: req.body.industry
    })
    .then(function(data){
      const res = { success: true, data: data, message:"created successful" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

controller.update = async ( req, res) =>{

  try {

    const id = 2;

    const response = await Users.update({
      country: req.body.country,
      city: req.body.city,
      zipcode: req.body.zipcode,
      address: req.body.address,
      language: req.body.language,
      email : req.body.email,
      industry: req.body.industry
    },{
      where: { id: req.body.id}
    })
    .then(function(data){
      const res = { success: true, data: data, message:"updated successful" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

controller.searchUsers = async ( req, res) =>{

  try {

    const response = await Users.findAll({
      where: { 
      
        country : req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        language : req.body.language

      }
    })
    .then( function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}


controller.searchUsersByIndustry = async ( req, res) =>{

  try {

    const response = await Users.findAll({
      where: { 
        industry: req.body.industry , 
      }
    })
    .then( function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}



controller.deleteImage = async ( req, res) =>{

  try {

    const response = await Users.update({
      image : "not set",
    },{
      where: { id: req.body.id}
    })
    .then( function(data){
      const res = { success: true, data: data, message:"Deleted successful" }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Images')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

controller.upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
}).single('image')


controller.uploadImage = async (req,res) =>{

  try {
    const response = await Users.update({
      image : req.file.path
    },{
      where: { id: req.body.id}
    })
    .then(function(data){
      const res = { success: true, data: data, message:"uploaded successful" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
  
}

module.exports = controller;

