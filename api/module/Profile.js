const mongoose=require('mongoose')


const userInfo=new mongoose.Schema({
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bio: { type: String, maxlength: 500 },
    hobbies: { type: [String] },
    favoriteBooks: { type: [String] },
    favoriteMovies: { type: [String] },
    languagesSpoken: { type: [String], required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    contactNumber: { type: String, required: true }

})




module.exports=mongoose.model('Profile',userInfo)