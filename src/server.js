const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require('jsonwebtoken')

const mediatorController = require('./controllers/mediator/mediatorController');

require('dotenv/config')


const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const resolutionRoutes = require('./routes/resolutionRoutes');
const mediatorRoutes = require('./routes/mediatorRoutes');
const contractRoutes = require('./routes/contractRoutes');

const resetPasswordRoutes = require('./routes/resetPasswordRoutes');


const app = express()



app.set('port', process.env.PORT || 5000)

app.use(express.json())

// app.use('/', (req ,res)=>{
//     res.send('Helo')
// })


app.listen(app.get('port'),()=>{
    console.log("Server Started on port "+app.get('port'))
})


app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }



app.use('/Images', express.static('./Images'))

app.use('/user',userRoutes);


app.use('/mediator',authenticateToken,mediatorRoutes);

app.use('/loginMediator',mediatorController.login);
app.use('/registerMediator',mediatorController.signup);

app.use('/contract',contractRoutes);
app.use('/resetPassword', resetPasswordRoutes);
app.use('/invoices',invoiceRoutes);
app.use('/resolutions',resolutionRoutes);
