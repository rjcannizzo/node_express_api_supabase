// this is a module! see package.json
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRouter.js')

const PORT = 5000
const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('GET request received...');
    res.send('Welcome to the Express API')
}) 

app.use('/users', userRoutes)

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

