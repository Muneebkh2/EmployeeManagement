import express from 'express' // import express
import bodyParser from 'body-parser'
require('dotenv').config();
let cors = require('cors')
// import Controllers...
// import AdminController from './app/controller/AdminController'
// import AuthController from './app/controller/AuthController'
// require('dotenv').config()
const routes = require('./routes/index')

const app = express() // define app

// BodyParse USED IN index.js
app.use(
    bodyParser.json(),
    bodyParser.urlencoded(
        { extended: true }
    ),
    cors()
)

app.use('/api', routes);

// app.use('/', AdminController)
// app.use('/', AuthController.SignIn())
// app.use('/signup', AuthController.Signup())

let port = process.argv[2];
if (!port) port = process.env['PORT'];
if (!port) port = 3000;

app.listen(port, () => {
    console.log('Server started: http://localhost:' + port);
})
