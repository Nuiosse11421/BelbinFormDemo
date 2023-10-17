import express from 'express'
import session from 'express-session'
import ejs from 'ejs'
import mongoose from './models/db.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

//controllers
import indexController from './controllers/indexController.js'
import loginController from './controllers/loginController.js'
import registerController from './controllers/registerController.js'
import formController from './controllers/formController.js'
import summaryController from './controllers/summaryController.js'
import logoutController from './controllers/logoutController.js'
import homeController from './controllers/homeController.js'
import historyController from './controllers/historyController.js'
//router

//middleware
import hasAuthController from './middleware/hasAuthController.js'
import authUserController from './middleware/authUserController.js'

//setdefault options
const app = express()
const port = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//mongoose
global.loggedIn = null

//set mid
// app.use(adminJs.options.rootPath, router)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret: 'secret',
}))
app.use('*',(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
//api
app.get('/', indexController)
app.use('/home',authUserController, homeController)
app.use('/history', authUserController, historyController)
app.use('/login',hasAuthController, loginController)
app.use('/register',hasAuthController, registerController)
app.use('/form',authUserController, formController)
app.get('/summary', summaryController)
app.use('/logout', logoutController)

//require api routes


app.listen(port, () => {
    console.log('Server is running on port 8080');
})