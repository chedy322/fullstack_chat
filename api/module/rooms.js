const mongoose=require('mongoose')
const Message=require('./message')


const Rooms=new mongoose.Schema({
    name:{
        type:String,
        // add required later
    },
    created_by:{
        type:String
    },
    rooms_type:{
        type:String,
        enum:['public', 'private', 'direct']
    },
    description:{
        type:String
    },
    members:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId
            },
            role:{
                type:String,
                enum:['admin', 'member']
            },
            username:{
                type:String
            }
        }
    ]
    // messages:{
    //     type:mongoose.isObjectId,
    //     ref:Message
    // }

},{
    Timestamp:true
})

module.exports=mongoose.model('Rooms',Rooms)