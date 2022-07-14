const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

require('dotenv/config')


const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const resolutionRoutes = require('./routes/resolutionRoutes');
const mediatorRoutes = require('./routes/mediatorRoutes');
const contractRoutes = require('./routes/contractRoutes');

const resetPasswordRoutes = require('./routes/resetPasswordRoutes');


const app = express()

app.set('port', process.env.PORT || 3000)

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


app.use('/Images', express.static('./Images'))

app.use('/user',userRoutes);
app.use('/mediator',mediatorRoutes);
app.use('/contract',contractRoutes);
app.use('/resetPassword', resetPasswordRoutes);
app.use('/invoices',invoiceRoutes);
app.use('/resolutions',resolutionRoutes);
