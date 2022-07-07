const express = require('express')
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const resolutionRoutes = require('./routes/resolutionRoutes');

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
app.use('/invoices',invoiceRoutes);
app.use('/resolutions',resolutionRoutes);
