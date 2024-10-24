const mongoose=require('mongoose')




const Message=new mongoose.Schema({
    chatId:{
        type:String,
    },
    userId:{
        type:String,
    },
    // error here should be string not array of strings
    messages:{
        type:[String],
    },
    room_notif:{
        type:String,
        default:null
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Message',Message)