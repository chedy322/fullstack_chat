const express=require('express')
const Route=express.Router()
const create_message=require('../controllers/message')



Route.route('/:id').post(create_message)

module.exports=Route