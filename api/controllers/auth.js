const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { validate } = require('deep-email-validator');
const user = require('../module/user');
const axios=require('axios')



// Register function
const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log(req.body)
        // Validate email
        // adddd this later
        // const { valid } = await validate(email);
        // if (!valid) {
        //     return res.status(400).json({ message: 'Invalid email address' });
        // }

        // Check if all required fields are provided
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // Check if email already exists
        const existing_user = await user.findOne({ email: email });
        if (existing_user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Send verification email
        // const token = await send_email(email);
        // if (!token) {
        //     return res.status(500).json({ message: 'Failed to send verification email' });
        // }

        // Create new user
        // ,verificationToken:token
        await user.create({ username, password, email});
        return res.status(201).json({ message: 'User created successfully. Please check your email for verification.' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};




const login=async (req,res)=>{
    try{
        const{email,password}=req.body
        if(!password || !email){
            return res.status(400).json({ message: 'Please fill in both email and password.' })//add status
        }
        const existing_user=await user.findOne({email})
        if(!existing_user){
            return res.status(401).json({message:"User doesn't exist please register"})
        }
        const match=await existing_user.comparePasword(password)
        if(!match){
            return res.status(401).json({message:'wrong email or password'})
        }
        //add token later with cookie
        const age = 1000 * 60 * 60 * 24 * 7; // 7 days for the access token
        const refreshTokenAge = 1000 * 60 * 60 * 24 * 30; // 30 days for the refresh token
        //to object converting mongoose to object
        const{password:userPass,...userInfo}=existing_user.toObject();
        // console.log(userInfo)
        // create access token
        const token=await existing_user.createJwt()
        // create refresh token
        const refreshtoken=await existing_user.createRefeshtoken()
        // store the refresh token in the cookie
        // check the age for the refreshtoken
        res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            secure:true,
            maxAge:refreshTokenAge
        })
        return res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            maxAge:age
        }).status(201).json(userInfo)

    }catch(err){
        console.log(err);
        res.status(501).json({message:"something happened"})

    }
}
const refreshtoken=async (req,res)=>{
    try{
        const refreshtoken=req.cookies('refreshtoken')
        // set the refresh token for 30 days
        const refreshTokenAge = 1000 * 60 * 60 * 24 * 30;
        if(!refreshtoken){
            return res.status(401).json({message:'Please login first'})
        }
        jwt.verify(refreshtoken,'refreshtoken',(err,payload)=>{
            if(err){
                return res.status(403).json({message:'invalid token'})
            }
            // generate another access token
            const accesstoken=jwt.sign({
                username:payload.username,
                id:payload.id
            },'chedy',
        {
            expiresIn:'10m'
        })
        // store the refresh in cookie httponly
        return res.cookie('token',accesstoken,{
            httpOnly:true,
            secure:true,
            maxAge:refreshTokenAge
        })
        }).status(201).json({'message':'cookie refreshed'})
    }catch(err){
        console.log(err)
    }
}



const logout=(req,res)=>{
    //logout by deleting the jwt from the cookie 
    return res.cookie("token","").status(200).json({message:"logged out"})

}


module.exports={register,login,logout,refreshtoken}

