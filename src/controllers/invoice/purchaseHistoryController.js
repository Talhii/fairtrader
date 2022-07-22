const Joi = require('joi');

const purchaseHistoryController = {}

// import model
var Orders = require('../../models/Orders');


purchaseHistoryController.unpaid = async (req, res) => {

    const schema = Joi.object().keys(
        {
            email: Joi.string().required(),
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
                    customeremail: req.body.email,
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



purchaseHistoryController.unpaidWithInvoiceId = async (req, res) => {

    const schema = Joi.object().keys(
        {
            email: Joi.string().required(),
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
                    customeremail: req.body.email,
                    invoiceId: req.params.invoiceId
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




purchaseHistoryController.paid = async (req, res) => {

    const schema = Joi.object().keys(
        {
            email: Joi.string().required(),
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
                customeremail: req.body.email,
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


purchaseHistoryController.paidWithInvoiceId = async (req, res) => {

    const schema = Joi.object().keys(
        {
            email: Joi.string().required(),
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
                    customeremail: req.body.email,
                    invoiceId: req.params.invoiceId
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

module.exports = purchaseHistoryController;