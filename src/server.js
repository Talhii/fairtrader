const express = require('express')
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



app.use('/Images', express.static('./Images'))

app.use('/user',userRoutes);
app.use('/mediator',mediatorRoutes);
app.use('/contract',contractRoutes);
app.use('/resetPassword', resetPasswordRoutes);
app.use('/invoices',invoiceRoutes);
app.use('/resolutions',resolutionRoutes);
