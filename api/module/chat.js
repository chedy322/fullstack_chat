const mongoose=require('mongoose')



const Chats=new mongoose.Schema({
    users:{
        type:[String]
    },
    last_message:{
        type:String
    },
    seenBy:{
        type:[String]
    },
    messages:{
        type:[String]
    }
},{
    timestamps:true
})



module.exports=mongoose.model('chats',Chats)