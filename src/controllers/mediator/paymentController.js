const Mediators = require("../models/Mediators");
const { GetResponseCom } = require("./GetResponse");

exports.createPayment = async (req, res) => {
  Mediators.update({
      businessName: req.body.businessName,
      businessWebsite: req.body.businessWebsite,
      cardNumber: req.body.cardNumber,
    }, {
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      Mediators.findByPk(req.params.id).then((r) => {
        res.send({
          id: r.id,
          email: r.email,
          businessName: r.businessName,
          businessWebsite: r.businessWebsite,
          cardNumber: r.cardNumber,
        });
        GetResponseCom(r);
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: new Error(err.message),
        msg:err.message
      });
    });
};