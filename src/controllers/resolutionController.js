const resolutionController = {}
const Joi = require('joi');
var nodemailer = require('nodemailer');

// import model

var Invoices = require('../models/Invoices')
var Mediators = require('../models/Mediators')
var Resolution = require('../models/Resolutions');

resolutionController.selectResolution = async (req, res) => {

    const schema = Joi.object().keys(
        {
            resolution: Joi.string().required()
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

            if (req.body.resolution == "two party only") {

                response = await Resolution.create({
                    resolution: req.body.resolution,
                    invoiceId: req.params.invoiceId,
                    friendsemail: "no need",
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

                response = await Resolution.create({
                    resolution: req.body.resolution,
                    invoiceId: req.params.invoiceId,
                    friendsemail: req.body.friendsemail,
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
            else if (req.body.resolution == "mediator") {

                const industry = []
                const response = await Mediators.findAll().then(function (data) {

                    data.forEach(mediator => {

                        industry.push(mediator.industry)

                    });

                    const res = { success: true, data: industry }
                    return res;
                })

                res.json(response)
            }


        } catch (e) {
            console.log(e);
        }
    }
}




resolutionController.displayMediatorWithIndustry = async (req, res) => {

        try {

            const response = Mediators.findAll({
                where: {
                    industry : req.params.industry
                }
            }).then(function(data){

                const res = { success: true, data: data }
                return res;
            })

            res.json(response)

        } catch (e) {
            console.log(e);
        }
    
}


module.exports = resolutionController;