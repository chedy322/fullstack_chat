const chats=async (req,res)=>{
    try{
        return res.status(201).send('message')

    }catch(err){
        console.log('eroor')
    }
}



module.exports=chats