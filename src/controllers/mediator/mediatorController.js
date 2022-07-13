const Joi = require('joi');

const axios = require("axios");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mediatorContoller = {}


dotenv.config();


var Mediators = require('../../models/Mediators');


// creating profile
mediatorContoller.signup = async (req, res) => {



    const schema = Joi.object().keys(
        {

            email: Joi.string().email().lowercase().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            lastName: Joi.string().required(),
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
        Mediators.findOne({
            where: {
                email: req.body.email,
            },
        }).then((mediator) => {
            if (mediator) {
                res.status(400).send({
                    message: "Failed! Email is already in use!",
                });
                return;
            }
        });

        const response = await Mediators.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            name: req.body.name,
            lastName: req.body.lastName,
        })
            .then(function (data) {
                const res = { success: true, message: "Mediator Signup successful" }
                return res;
            })
            .catch(error => {
                const res = { success: false, error: error }
                return res;
            })
        res.json(response);

    }
}


//login
mediatorContoller.login = async (req, res) => {

    const mediator = await Mediators.findOne({ where: { email: req.body.email } });
    if (mediator) {
        const password_valid = await bcrypt.compare(req.body.password, mediator.password);
        if (password_valid) {

            const token = jwt.sign({ "id": mediator.id, "email": mediator.email }, "Secret");
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }

    } else {
        res.status(404).json({ error: "mediator does not exist" });
    }

}


mediatorContoller.createProfile = (req, res) => {
    Mediators.update(
        {
            country: req.body.country,
            city: req.body.city,
            phone: req.body.phone,
            language: {
                lang: req.body.language,
            },
            industry: {
                indus: req.body.industry,
            },
            facebookLink: req.body.facebookLink,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(() => {
            Mediators.findByPk(req.params.id).then((r) => {
                res.send({
                    id: r.id,
                    email: r.email,
                    country: r.country,
                    city: r.city,
                    phone: r.phone,
                    language: r.language,
                    industry: r.industry,
                    facebookLink: r.facebookLink,
                });
            });
        })
        .catch((err) => {
            res.status(400).send({
                message: err,
                msg: err.message,
            });
        });
};


mediatorContoller.PassportGet = (req, res) => {
    Mediators.findByPk(req.params.id).then((r) => {
        res.send({
            passport: r.passport,
        });
    }).catch((err) => {
        res.status(400).send({
            message: new Error(err.message),
            msg: err.message
        });
    });
}

mediatorContoller.PassportController = async (req, res) => {
    Mediators.update(
        {
            passport: `${req.protocol}://${req.get("host")}/Images/Mediator/${req.files[0].filename
                }`,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(() => {
            Mediators.findByPk(req.params.id).then((r) => {
                res.send({
                    passport: r.passport,
                });
            });
        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message
            });
        });
};

mediatorContoller.PassportDelete = async (req, res) => {
    Mediators.update(
        {
            passport: "",
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(() => {
            res.send({
                msg: "image removed"
            })

        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message
            });
        });
};



mediatorContoller.ApprovingGet = (req, res) => {
    Mediators.findAll({
        where: {
            status: 0,
        },
    })
        .then((r) => {
            res.send(r);
        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message,
            });
        });
};

mediatorContoller.ApprovedController = async (req, res) => {
    Mediators.update({
        status: req.body.status,
    }, {
        where: {
            id: req.params.id,
        },
    }).then(async () => {
        const data = await Mediators.findByPk(req.params.id);
        if (data && data.status == 2) {
            data.destroy();
            res.send(data);
        } else if (data) {
            res.send(data);
        }
    });
};

mediatorContoller.ApprovedGet = (req, res) => {
    Mediators.findAll({
        where: {
            status: 1,
        },
    })
        .then((r) => {
            res.send(r);
        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message,
            });
        });
};


mediatorContoller.DocumentsGet = (req, res) => {
    Mediators.findByPk(req.params.id).then((r) => {
        res.send({
            documents: r.documents,
        });
    }).catch((err) => {
        res.status(400).send({
            message: new Error(err.message),
            msg: err.message
        });
    });
}

mediatorContoller.DocumentsController = async (req, res) => {

    Mediators.update(
        {
            documents: `${req.protocol}://${req.get("host")}/Images/Mediator/${req.files[0].filename}`,
        },
        {
            where: {
                id: req.params.id,
            },
        })
        .then(() => {
            Mediators.findByPk(req.params.id).then((r) => {
                res.send({
                    documents: r.documents,
                });
            });
        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message
            });
        });
};

mediatorContoller.DocumentsDelete = async (req, res) => {
    Mediators.update(
        {
            documents: "",
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(() => {
            res.send({
                msg: "image removed"
            })

        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message
            });
        });
};



mediatorContoller.IdCardGet = (req, res) => {
    Mediators.findByPk(req.params.id).then((r) => {
        res.send({
            idCard: r.idCard,
        });
    }).catch((err) => {
        res.status(400).send({
            message: new Error(err.message),
            msg: err.message
        });
    });
}

mediatorContoller.IdCardController = async (req, res) => {
    Mediators.update(
        {
            idCard: `${req.protocol}://${req.get("host")}/Images/Mediator/${req.files[0].filename
                }`,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(() => {
            Mediators.findByPk(req.params.id).then((r) => {
                res.send({
                    idCard: r.idCard,
                });
            });
        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message
            });
        });
};

mediatorContoller.IdCardDelete = async (req, res) => {
    Mediators.update(
        {
            idCard: "",
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then(() => {
            res.send({
                msg: "image removed"
            })

        })
        .catch((err) => {
            res.status(400).send({
                message: new Error(err.message),
                msg: err.message
            });
        });
};





module.exports = mediatorContoller;
