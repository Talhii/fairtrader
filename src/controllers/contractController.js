const contractController = {}

const multer = require('multer')
const path = require('path')
const Joi = require('joi');
var Contracts = require('../models/Contracts')
var Invoices = require('../models/Invoices')
var Resolutions = require('../models/Resolutions');
const { where } = require('sequelize');
const Orders = require('../models/Orders');


contractController.create = async (req, res) => {

    const schema = Joi.object().keys(
        {
            responsetime: Joi.string().required(),
            apealtime: Joi.string().required(),
            ftpterms: Joi.string().required(),
            applytoallinvoices: Joi.string().required(),
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

            var response = await Contracts.create({
                sellerwalletaddress: req.body.sellerwalletaddress,
                termsandconditionsfile: req.files.termsandconditionsfile[0].path,
                warrantyfile: req.files.warrantyfile[0].path,
                responsetime: req.body.responsetime,
                attachfiles: req.files.attachfiles[0].path,
                apealtime: req.body.apealtime,
                ftpterms: req.body.ftpterms,
                applytoallinvoices: req.body.applytoallinvoices,
                invoiceId: req.params.invoiceId

            }).then(async function () {

                response = await Resolutions.findAll(
                    {
                        where: {
                            invoiceId: req.params.invoiceId
                        },
                        include: Invoices
                    })

                Orders.create({
                    sellerwalletaddress: response[0].invoice.dataValues.sellerwalletaddress,
                    invoiceId: response[0].invoice.dataValues.id,
                    customername: response[0].invoice.dataValues.customername,
                    customeraddress: response[0].invoice.dataValues.customeraddress,
                    customeremail: response[0].invoice.dataValues.customeremail,
                    invoicefile: response[0].invoice.dataValues.invoicefile,
                    payment: response[0].invoice.dataValues.payment,
                    resolution: response[0].resolution,
                    friendsemail: response[0].friendsemail,
                    mediator: response[0].mediator,
                    termsandconditionsfile: req.files.termsandconditionsfile[0].path,
                    warrantyfile: req.files.warrantyfile[0].path,
                    responsetime: req.body.responsetime,
                    attachfiles: req.files.attachfiles[0].path,
                    apealtime: req.body.apealtime,
                    ftpterms: req.body.ftpterms,
                    applytoallinvoices: req.body.applytoallinvoices,

                })

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
    limits: { fileSize: '5242880' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf|jpg|jpeg|png/
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