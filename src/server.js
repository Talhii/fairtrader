const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.json())

// app.use('/', (req ,res)=>{
//     res.send('Helo')
// })


app.listen(app.get('port'),()=>{
    console.log("Server Started on port "+app.get('port'))
})

const routes = require('./routes');

app.use('/Images', express.static('./Images'))

app.use(routes);