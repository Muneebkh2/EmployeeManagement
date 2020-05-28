import express from 'express' // import express
import bodyParser from 'body-parser'

// import Controllers...
import AdminController from './app/controller/AdminController'
import AuthController from './app/controller/AuthController'

require('./config/passport.config')
const app = express() // define app

// bodyParse USED IN index.js
app.use(
    bodyParser.json(),
    bodyParser.urlencoded(
        { extended: true }
    ),
)
app.use('/', AdminController)
app.use('/', AuthController)

let port = process.argv[2];
if (!port) port = process.env['PORT'];
if (!port) port = 8000;

app.listen(port, () =>  {
    console.log('Server started: http://localhost:' + port);
})
  