//import sequelize
var Sequelize = require('sequelize');
const multer = require('multer')
const path = require('path')
const Joi = require('joi');

const invoiceController = {}

// import model
var Invoices = require('../../models/Invoices');

invoiceController.create = async (req, res) => {

    const schema = Joi.object().keys(
        {

            sellerwalletaddress: Joi.string().required(),
            customername: Joi.string().required(),
            customeraddress: Joi.string().required(),
            customeremail: Joi.string().required(),
            payment: Joi.string().required(),

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
            const invoiceNumber = Math.floor(100000 + Math.random() * 900000)

            const response = await Invoices.create({

                sellerwalletaddress: req.body.sellerwalletaddress,
                invoicenumber: invoiceNumber,
                customername: req.body.customername,
                customeraddress: req.body.customeraddress,
                customeremail: req.body.customeremail,
                invoicefile: req.file.path,
                payment: req.body.payment,

            })
                .then(function (data) {
                    const res = { success: true, invoiceId: data.id }
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
        cb(null, 'Invoices')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

invoiceController.upload = multer({
    storage: storage,
    limits: { fileSize: '5242880' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf|docx|doc/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('invoicefile')


module.exports = invoiceController;