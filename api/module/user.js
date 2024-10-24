const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const { Timestamp } = require('mongodb');



//add more condition later 

const Schema=new mongoose.Schema({
    email: {
        type: String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    avatar:{
        type:String,
    },
    isVerified:{
        type:String,
        default:false
    },
    verificationToken:{
        type:String,
    },
    following:{
        type:[String]
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    education: { type: mongoose.Schema.Types.ObjectId, ref: 'Education' },
    socialLinks: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialLinks' },
    // activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
    facetimeID: { type: String, unique: true },
},
{
    timestamps:true
}
)

Schema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

Schema.methods.comparePasword=async function(sugPass){
    const match=await bcrypt.compare(sugPass,this.password)
    return match
}
// Schema.pre('findOneAndUpdate', async function (next) {
//     const update = this.getUpdate();
  
//     if (update.password) { 
//       const salt = await bcrypt.genSalt(10);
//       update.password = await bcrypt.hash(update.password, salt);
//     }
  
//     next();
//   });
  
//creating jwt method
//add secret to dotenv
Schema.methods.createJwt=async function(){
    const token=await jwt.sign({
        username:this.username,
        id:this._id,
    },
        'chedy',
        {
            expiresIn:'30d'
        }


    )
    return token

}
Schema.methods.createRefeshtoken=async function(){
        const token=await jwt.sign({
            username:this.username,
            id:this._id
        },
    'refrshtoken',
{
    expiresIn:"10m"
})
return token
}

module.exports=mongoose.model('User',Schema)