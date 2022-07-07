const resolutionController = {}
const Joi = require('joi');

// import model
var Resolution = require('../models/Resolutions');

resolutionController.selectResolution = async (req, res) => {

    const schema = Joi.object().keys(
        {
            resolution: Joi.string().required(),
            foreign_id : Joi.number().required()
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

                const response =  await Resolution.create({
                    resolution: req.body.resolution,
                    foreign_id : req.body.foreign_id,
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

                const response =  await Resolution.create({
                    resolution: req.body.resolution,
                    foreign_id : req.body.foreign_id,
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

        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = resolutionController;