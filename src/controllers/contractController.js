const contractController = {}

const multer = require('multer')
const path = require('path')
const Joi = require('joi');
var Contracts = require('../models/Contracts')



contractController.create = async (req, res) => {

    const schema = Joi.object().keys(
        {
            responsetime: Joi.string().required(),
            apealtime: Joi.string().required(),
            ftpterms: Joi.string().required(),
            applytoallinvoices: Joi.string().required(),
            sellerid :  Joi.number().required(),
            buyerid :  Joi.number().required(),
            
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

            const response = await Contracts.create({
                termsandconditionsfile: req.files.termsandconditionsfile[0].path,
                warrantyfile: req.files.warrantyfile[0].path,
                responsetime: req.body.responsetime,
                attachfiles:req.files.attachfiles[0].path,
                apealtime: req.body.apealtime,
                ftpterms: req.body.ftpterms,
                applytoallinvoices: req.body.applytoallinvoices,
                sellerid : req.body.sellerid,
                buyerid: req.body.buyerid

            })
                .then(function (data) {
                    const res = { success: true, message: "created successful" }
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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Contracts')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



contractController.uploadfiles = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf|png|jpg/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).fields(
    [
      { 
        name: 'termsandconditionsfile',
        filename : "asasx",
        maxCount: 1 
      }, 
      { 
        name: 'warrantyfile', 
        maxCount: 1 
      },
      {
        name: 'attachfiles', 
        maxCount: 1 
      }
    ]
  )



module.exports = contractController