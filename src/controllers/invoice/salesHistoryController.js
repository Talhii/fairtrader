const Joi = require('joi');

const salesHistoryController = {}

// import model
var Orders = require('../../models/Orders');


salesHistoryController.unPaid = async (req, res) => {

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

            const response = await Orders.findAll({
                where: {
                    sellerwalletaddress: req.body.walletaddress,
                }
            })
                .then(function (data) {

                    var unPaidInvoices = []

                    data.forEach(
                        (invoices) => {

                            if (invoices.paidstatus == false) {

                               unPaidInvoices.push(invoices)
                            }
                        }
                    );

                    const res = { success: true, data: unPaidInvoices }
                    return res;
                })
                .catch(error => {
                    const res = { success: false, error: error }
                    return res;
                })

            res.send(response);

        } catch (e) {
            console.log(e);
        }
    }
}


salesHistoryController.unPaidWithInvoiceId = async (req, res) => {

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

            const response = await Orders.findAll({
                where: {
                    sellerwalletaddress: req.body.walletaddress,
                    invoiceId : req.params.invoiceId
                }
            })
                .then(function (data) {

                    var unPaidInvoices = []

                    data.forEach(
                        (invoices) => {

                            if (invoices.paidstatus == false) {

                               unPaidInvoices.push(invoices)
                            }
                        }
                    );

                    const res = { success: true, data: unPaidInvoices }
                    return res;
                })
                .catch(error => {
                    const res = { success: false, error: error }
                    return res;
                })

            res.send(response);

        } catch (e) {
            console.log(e);
        }
    }
}




salesHistoryController.paid = async (req, res) => {

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

            const response = await Orders.findAll({
                where: {
                    sellerwalletaddress: req.body.walletaddress,
                }
            })
                .then(function (data) {

                    var paidInvoices = []
                    data.forEach(
                        (invoices) => {

                            if (invoices.paidstatus == true) {

                                paidInvoices.push(invoices)

                            }
                        }
                    );
                    const res = { success: true, data: paidInvoices }
                    return res;
                })
                .catch(error => {
                    const res = { success: false, error: error }
                    return res;
                })

            res.send(response);

        } catch (e) {
            console.log(e);
        }
    }
}



salesHistoryController.paidWithInvoiceId = async (req, res) => {

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

            const response = await Orders.findAll({
                where: {
                    sellerwalletaddress: req.body.walletaddress,
                    invoiceId : req.params.invoiceId
                }
            })
                .then(function (data) {

                    var unPaidInvoices = []

                    data.forEach(
                        (invoices) => {

                            if (invoices.paidstatus == true) {

                               unPaidInvoices.push(invoices)
                            }
                        }
                    );

                    const res = { success: true, data: unPaidInvoices }
                    return res;
                })
                .catch(error => {
                    const res = { success: false, error: error }
                    return res;
                })

            res.send(response);

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = salesHistoryController;