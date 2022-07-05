//import sequelize
var Sequelize = require('sequelize');
const multer = require('multer')
const path = require('path')

const userContoller = {}

// import model
var Users = require('../models/Users');

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


// Displaying User Data to Their own profile
userContoller.getUsersByWallet = async (req, res) => {

  try {

    const response = await Users.findAll({
      where: {
        walletaddress: req.body.walletaddress,
      }
    })
      .then(function (data) {
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


// creating profile
userContoller.create = (req, res) => {

  const schema = Joi.object().keys(
    {

      walletaddress: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
      language: Joi.string().required(),
      buisnessname: Joi.string().required(),
      website: Joi.string().required(),
      phoneno: Joi.string().required(),
      postaladdress: Joi.string().required(),
      facebook: Joi.string().required(),
      priceperhour: Joi.string().required(),
      providing: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      industry: Joi.string().required(),
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

      const response = Users.create({
        walletaddress: req.body.walletaddress,
        image: "not set",
        country: req.body.country,
        city: req.body.city,
        zipcode: req.body.zipcode,
        address: req.body.address,
        language: req.body.language,
        buisnessname: req.body.buisnessname,
        website: req.body.website,
        phoneno: req.body.phoneno,
        postaladdress: req.body.postaladdress,
        facebook: req.body.facebook,
        priceperhour: req.body.priceperhour,
        providing: req.body.providing,
        trustscore: 100,
        email: req.body.email,
        industry: req.body.industry
      })
        .then(function (data) {
          const res = { success: true, data: data, message: "created successful" }
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

//update user profile
userContoller.update = async (req, res) => {

  try {

    const response = await Users.update({
      country: req.body.country,
      city: req.body.city,
      zipcode: req.body.zipcode,
      address: req.body.address,
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
    }, {
      where: { walletaddress: req.body.walletaddress }
    })
      .then(function (data) {
        const res = { success: true, data: data, message: "updated successful" }
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


// search all users on the basis of four parameters ( country , city , zipcode , language)
userContoller.searchUsers = async (req, res) => {

  const schema = Joi.object().keys(
    {
      country: Joi.string().required(),
      city: Joi.string().required(),
      zipcode: Joi.string().required(),
      language: Joi.string().required(),
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

      const response = await Users.findAll({
        where: {

          country: req.body.country,
          city: req.body.city,
          zipcode: req.body.zipcode,
          language: req.body.language

        }
      })
        .then(function (data) {
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

}

// search all users by just industry type
userContoller.searchUsersByIndustry = async (req, res) => {

  const schema = Joi.object().keys(
    {
      industry: Joi.string().required(),
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

      const response = await Users.findAll({
        where: {
          industry: req.body.industry,
        }
      })
        .then(function (data) {
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
}

//search a single user by their wallet address
userContoller.searchUsersByWallet = async (req, res) => {

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

      const response = await Users.findAll({
        where: {
          walletaddress: req.body.walletaddress,
        }
      })
        .then(function (data) {
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
}

// search a single user by their email
userContoller.searchUsersByEmail = async (req, res) => {

  const schema = Joi.object().keys(
    {
      email: Joi.string().email().lowercase().required(),
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

      const response = await Users.findAll({
        where: {
          email: req.body.email,
        }
      })
        .then(function (data) {
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
}


// search users on their providings ( services / goods / mediator)
userContoller.searchUsersByLookingFor = async (req, res) => {

  const schema = Joi.object().keys(
    {
      providing: Joi.string().required(),
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

      const response = await Users.findAll({
        where: {
          providing: req.body.lookingfor,
        }
      })
        .then(function (data) {
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
}


// get whole data of user by wallet address when clicked on user
userContoller.getUsersDataByWalletAddress = async (req, res) => {

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

      const response = await Users.findAll({
        where: {
          walletaddress: req.body.walletaddress,
        }
      })
        .then(function (data) {
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

  try {

    const response = await Users.update({
      image: "not set",
    }, {
      where: { walletaddress: req.body.walletaddress }
    })
      .then(function (data) {
        const res = { success: true, data: data, message: "Deleted successful" }
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

userContoller.upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
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
          const res = { success: true, data: data, message: "uploaded successful" }
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

