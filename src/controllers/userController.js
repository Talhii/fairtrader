//import sequelize
var Sequelize = require('sequelize');
const multer = require('multer')
const path = require('path')

const Joi = require('joi');
const userContoller = {}
const fs = require('fs')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// import model
var Users = require('../models/Users');
const { where } = require('sequelize');

//const { Op } = require("sequelize");

// userContoller.list = async (req, res) => {

//   const response = await Users.findAll()
//     .then(function (data) {
//       const res = { success: true, data: data }
//       return res;
//     })
//     .catch(error => {
//       const res = { success: false, error: error }
//       return res;
//     })
//   res.json(response);

// }


// creating profile
userContoller.create = async (req, res) => {

  const schema = Joi.object().keys(
    {

      walletaddress: Joi.string().required(),

    });


  const validatation = schema.validate(req.body)

  if (validatation.error) {

    res.status(422).json(
      {
        status: 'error',
        message: 'Invalid request data',
        error: validatation.error
      });
    console.log("Invalid Request Data")
  }
  else {
    try {

      const response = await Users.create({
        walletaddress: req.body.walletaddress,
      })
        .then(function (data) {
          const res = { success: true, message: "User creaated successfully" }
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
}


//login
userContoller.login = async (req, res) => {

  const schema = Joi.object().keys(
    {

      walletaddress: Joi.string().required(),

    });


  const validatation = schema.validate(req.body)

  if (validatation.error) {

    res.status(422).json(
      {
        status: 'error',
        message: 'Invalid request data',
        error: validatation.error
      });
    console.log("Invalid Request Data")
  }
  else {

    const response = await Users.findOne({
      where: {
        walletaddress: req.body.walletaddress,
      },
    }).then(data => {
      if (data != null) {
        const res = { success: true, message: "login successful" }
        return res;
      }
      else {
        const res = { success: false, message: "user not found with this wallet address" }
        return res;
      }
    })
      .catch(error => {
        const res = { success: false, error: error }
        return res;
      })
    res.json(response);
  }
}

//update user profile
userContoller.update = async (req, res) => {


  try {

    const response = await Users.update(req.body, {
      where: { walletaddress: req.body.walletaddress }
    })
      .then(data => {
        if (data == 1) {
          const res = { success: true, message: "updated successful" }
          return res;
        }
        else {
          const res = { success: false, message: "Not found" }
          return res;
        }
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


// search all users on the basis of four parameters ( country , city , zipcode , language)
userContoller.searchUsers = async (req, res) => {

  try {


    const response = await Users.findAll({

      where: {

        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        language: req.body.language,
        buisnessname: req.body.buisnessname,
        website: req.body.website,
        phoneno: req.body.phoneno,
        postaladdress: req.body.postaladdress,
        facebook: req.body.facebook,
        priceperhour: req.body.priceperhour,
        providing: req.body.providing,
        email: req.body.email,
        industry: req.body.industry

      }
    })
      .then(data => {

        if (data != "") {
          const res = { success: true, data: data }
          return res;
        }
        else {
          const res = { success: false, message: "Not found" }
          return res;
        }
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

// search all users by just industry type
userContoller.searchUsersByIndustry = async (req, res) => {

  try {

    const response = await Users.findAll({
      where: {
        industry: req.params.industry,
      }
    })
      .then(data => {
        if (data != "") {
          const res = { success: true, data: data }
          return res;
        }
        else {
          const res = { success: false, message: "Not found" }
          return res;
        }
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

//search a single user by their wallet address
userContoller.searchUsersByWallet = async (req, res) => {

  try {

    const response = await Users.findAll({
      where: {
        walletaddress: req.params.walletaddress,
      }
    })
      .then(data => {
        if (data != "") {
          const res = { success: true, data: data }
          return res;
        }
        else {
          const res = { success: false, message: "Not found" }
          return res;
        }
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

// search a single user by their email
userContoller.searchUsersByEmail = async (req, res) => {

  try {

    const response = await Users.findAll({
      where: {
        email: req.params.email,
      }
    })
      .then(data => {
        if (data != "") {
          const res = { success: true, data: data }
          return res;
        }
        else {
          const res = { success: false, message: "Not found" }
          return res;
        }
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


// search users on their providings ( services / goods / mediator)
userContoller.searchUsersByLookingFor = async (req, res) => {

  try {

    const response = await Users.findAll({
      where: {
        providing: req.params.providing,
      }
    })
      .then(data => {
        if (data != "") {
          const res = { success: true, data: data }
          return res;
        }
        else {
          const res = { success: false, message: "Not found" }
          return res;
        }
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




// Get the list of all users or service providers and Show them on the basis of Search Preference
userContoller.displayUserBySearchPreference = async (req, res) => {

  try {

    const response = await Users.findAll()
      .then(function (data) {

        if (req.body.searchPreference == "TrustScore") {

        }
        else if (req.body.searchPreference == "PricePerHour") {

        }
        else if (req.body.searchPreference == "Location") {

        }
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




userContoller.deleteImage = async (req, res) => {


  const response = await Users.findOne({
    where: {
      walletaddress: req.body.walletaddress
    }
  }).then(data => {
    if (data != "") {

      if (data.image != "") {

        fs.unlink(data.image, function (err) {
          if (err) throw err;
          console.log('File deleted!');
          Users.update({
            image: "",
          }, {
            where: { walletaddress: req.body.walletaddress }
          })
        });

        const res = { success: true, message: "Image Deleted Successfully" }
        return res;
      }
      else{
        const res = { success: false, message: "Image not uplaoded of the user" }
        return res;
      }


    }
    else {
      const res = { success: false, message: "Wallet address not found" }
      return res;
    }
  })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })

  res.json(response)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/User')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

userContoller.upload = multer({
  storage: storage,
  limits: { fileSize: '5242880' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('image')


userContoller.uploadImage = async (req, res) => {

  const schema = Joi.object().keys(
    {
      walletaddress: Joi.string().required(),
    });


  const validatation = schema.validate(req.body)

  if (validatation.error) {

    res.status(422).json(
      {
        status: 'error',
        message: 'Invalid request data',
        error: validatation.error
      });
    console.log("Invalid Request Data")
  }

  else {
    try {
      const response = await Users.update({
        image: req.file.path
      }, {
        where: { walletaddress: req.body.walletaddress }
      })
        .then(function (data) {
          const res = { success: true, message: "uploaded successful" }
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
}

module.exports = userContoller;

