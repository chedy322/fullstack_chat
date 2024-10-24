const express=require('express')
const {get_all_users,get_user_by_id,follow_user,fill_data,delete_profile}=require('../controllers/user')
const Route=express.Router()



Route.route('/').get(get_all_users).post(fill_data).delete(delete_profile)
Route.route('/userinfo').get(get_user_by_id)
Route.route('/:id').post(follow_user)
// Route.route('/')



module.exports=Route