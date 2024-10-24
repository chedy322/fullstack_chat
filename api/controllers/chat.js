const chats=require('../module/chat')
const user=require('../module/user')
const message=require('../module/message')


const get_all_chats = async (req, res) => {
    try {
        // Get the user id from req.user and get chats related to that user
        const { id: user_id } = req.user;
        const { name } = req.query;
        console.log(req.query)
        if (!user_id) {
            return res.status(401).json({ message: 'You need to log in' });
        }

        let chatQuery = { users: { $in: [user_id] } };

        if (name) {
            // Find users whose username matches the query
            const relative_users = await user.find({
                username: {
                    $regex: '^' + name,
                    $options: 'i'
                }
            }).select('_id')
            console.log(relative_users)
            // console.log(relative_users)
            // nedd to check this
            if(relative_users.length==0){
                chatQuery=null
            }
            const relative_user_ids = relative_users.map(u => u._id.toString());
            // console.log(relative_user_ids)
            // Add an additional filter to the chat query
            // probably fix this with making ...users of the prev query
            chatQuery = {
                users: {
                    $all: [
                        user_id,
                        ...relative_user_ids
                    ]
                }
            };
        }

        // Fetch chats based on the updated query
        const chat = await chats.find(chatQuery).sort('createdAt').lean();

        // Populate receiver data for each chat
        for (let c of chat) {
            const receiver_id = c.users.find(id => id.toString()!==user_id.toString());
            const receiver_data = await user.findOne({ _id: receiver_id }).select(['username', 'avatar', 'following']);
            c.receiver = receiver_data;
        }

        return res.status(200).json({ chat });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// const matching_chat=async(req,res)=>{
//     try{
//         // taking the name from the  query
//         const {name}=req.query

//         const chat=await chats.find()

//     }catch(err){
//         console.log(err)
//     }
// }


const get_chat = async (req, res) => {
    try {
        // Get the chat ID from the URL and the user ID from the authenticated user
        const { id: chat_id } = req.params;
        const { id: user_id } = req.user;

        // Find the chat by ID and update the seenBy field
        const chat = await chats.findOneAndUpdate(
            { _id: chat_id, users: { $in: [user_id] } },
            { $push: { seenBy: user_id } },
            { new: true }
        );

        // Check if the chat was found
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Get the messages associated with the chat
        const messages = await message.find({ chatId: chat_id });

        // Return the chat and its messages
        return res.status(200).json({ chat, messages });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to retrieve chat' });
    }
}


const create_chat=async (req,res)=>{
    try{
        const {receiver:receiver_id}=req.body
        // console.log(receiver_id)
        const{id:user_id}=req.user
        const existing_chat=await chats.findOne({users:{$all:[receiver_id,user_id]}})
        // handle this in front end if the user already has a chat he wil get message
        console.log(existing_chat)
        if(existing_chat){
            return res.status(200).json({message:'you already have a chat with this user'})
        }
        // create a new chat with the user and receiver
        const chat=await chats.create({
            users:[user_id,receiver_id],
            seenBy:user_id,
            messages:[],
            last_message:""
        })
        return res.status(201).json({chat})

    }catch(err){
        console.log(err)
    }

}
// get the chat id and delete it
const delete_chat=async (req,res)=>{
    try{
        const{id:chat_id}=req.params
        const{id:user_id}=req.user
        const existing_chat=await chats.findOne({_id:chat_id,users:{$in:[user_id]}})
        if(!existing_chat){
            return res.status(404).json({message:"No existing chat"})
        }
        // delete the chat
         await chats.findOneAndDelete({_id:chat_id,users:{$in:[user_id]}})
         await message.findOneAndDelete({chatId:chat_id})
        return res.status(200).json({message:"chat deleted"})
    }catch(err){
        console.log(err)
    }
}
// reading chat msg
const read_msg=async (req,res)=>{
    try{
        // get chat_id from params
        const{id:chat_id}=req.params
        // get user id from user info
        const {id:user_id}=req.user
        // find the chat based on the user id and the chat id
        const chat=await chat.findOneAndUpdate({
            _id:chat_id,
            users:{
                $in:[user_id]
            }
        },{
            seenBy:{
                $addToSet:[user_id]
            }
        },{
            new:true
        })
        return res.status(200).json({chat})

    }catch(err){
        console.log(err)
    }
}
const notif=async (req,res)=>{
    // find the not seenby chat by the user and count them 
    try{
        const {_id:user_id}=req.user
        const count=await chat.count({
            users:{
                $in:[user_id]
            },
            seenBy:{
                $nin:[user_id]
            }
        })
        console.log(count)

return res.status(200).json({count})
    }catch(err){
        console.log(err)
    }
}
module.exports={get_all_chats,get_chat,create_chat,delete_chat,read_msg,notif}