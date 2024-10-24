const Message=require('../module/message')
const chats=require('../module/chat')
const sanitizeHtml = require('sanitize-html');
// will get the chat id from url 
const create_message=async (req,res)=>{
    try{
        const {id:chat_id}=req.params
        const{id:user_id}=req.user
        const message=req.body.message
        // sanitizing the user input
        const usercomment=sanitizeHtml(message)
        console.log(usercomment)
        console.log("req"+ " " + req.body)
        console.log("message"+message)
        const messages=await Message.create({
            chatId:chat_id,
            userId:user_id,
            messages:message,
            room_notif:req.body.room_notif?req.body.room_notif:null
        })
        console.log(messages)
        // check messages is needed
        await chats.findOneAndUpdate({_id:chat_id},{
           $push:{
            seenBy:user_id,
            messages:message
           },
           last_message:message,
        })
        return res.status(201).json({messages})

    }catch(err){
        console.log(err)

    }

}



module.exports=create_message