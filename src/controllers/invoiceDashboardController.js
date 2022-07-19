const Joi = require('joi');

const invoiceDashboardController = {}

// import model
var Invoices = require('../models/Invoices');


invoiceDashboardController.history = async (req, res) => {

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

            const response = await Invoices.findAll({
                customerwalletaddress: req.body.walletaddress,
            })
                .then(function (data) {


                    var notPaidCount = 0
                    var totalCount = 0
                    data.forEach(
                        (invoices) => {

                            totalCount = totalCount + 1
                            if (invoices.paidstatus == false) {

                                notPaidCount = notPaidCount + 1;
                            }
                        }
                    );
                    const res = { success: true, data: {notpaid : notPaidCount , total : totalCount} }
                    return res;
                })
                .catch(error => {
                    const res = { success: false, error: error }
                    return res;
                })


                const response2 = await Invoices.findAll({
                    sellerwalletaddress: req.body.walletaddress,
                })
                    .then(function (data) {
    
                        var notPaidCount = 0
                        var paidCount = 0
    
                        data.forEach(
                            (invoices) => {
    
                                if (invoices.paidstatus == false) {
    
                                    notPaidCount = notPaidCount + 1;
                                }
                                else{
                                    paidCount = paidCount + 1
                                }
                            }
                        );
    
                        const res = { success: true, data: {notpaid : notPaidCount , paid : paidCount}  }
                        return res;
                    })
                    .catch(error => {
                        const res = { success: false, error: error }
                        return res;
                    })
    



            res.send({purchaseHistory : response , salesHistory : response2 });

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = invoiceDashboardController;