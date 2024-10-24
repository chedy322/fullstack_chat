const express=require('express')
const Route=express.Router()
const {register,login,logout}=require('../controllers/auth')


Route.route('/login').post(login)
Route.route('/register').post(register)
Route.route('/logout').post(logout)
// Route.route('/google/auth').get(googleLogin)
// Route.route('/google/auth/callback').get(googlecallback)





module.exports=Route