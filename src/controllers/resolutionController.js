const resolutionController = {}
const Joi = require('joi');
var nodemailer = require('nodemailer');

// import model

var Invoices = require('../models/Invoices')
var Resolution = require('../models/Resolutions');

resolutionController.selectResolution = async (req, res) => {

    const schema = Joi.object().keys(
        {
            resolution: Joi.string().required(),
            sellerwalletaddress: Joi.string().required(),
            customerwalletaddress : Joi.string().required()
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


            var response = await Invoices.findAll(
                {
                    where: {
                        sellerwalletaddress: req.body.sellerwalletaddress,
                        customerwalletaddress : req.body.customerwalletaddress
                    },
                }
            ).then(async function(data){
                

                if (req.body.resolution == "two party only") {

                     response =  await Resolution.create({
                        resolution: req.body.resolution,
                        invoiceId : data[0].dataValues.id,
                        friendsemail : "no need",
                        mediator: "no need"
                    }).then(function (data) {
                        const res = { success: true, message: "Selected successfully" }
                        return res;
                    })
                        .catch(error => {
                            const res = { success: false, error: error }
                            return res;
                        })
                    res.json(response);
                }
                else if (req.body.resolution == "mutual friend") {
    
                     response =  await Resolution.create({
                        resolution: req.body.resolution,
                        invoiceId: data[0].dataValues.id,
                        friendsemail : req.body.friendsemail,
                        mediator : "no need"
                    }).then(function (data) {
                        const res = { success: true, message: "Selected successfully" }
                        return res;
                    })
                        .catch(error => {
                            const res = { success: false, error: error }
                            return res;
                        })
                    res.json(response);
                }
                else {
    
                }
    
            })

            
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = resolutionController;