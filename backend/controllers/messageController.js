import  { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js"

export const sendMessage = async(req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id
        const {message} = req.body

        let conversation = await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage) conversation.message.push(newMessage._id);
        await Promise.all([conversation.save(),newMessage.save()])

        // implement socket io


        return res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error,'sendMessage api error')
    }
}

export const getMessage = async(req,res)=>{
    try {
        const senderId = req.id
        const receiverId = req.params.id;
        const conversation = await Conversation.find({
            participants:{$all:[senderId,receiverId]}
        })
        if(!conversation) return res.status(200).json({success:true,messages:[]})

        return res.status(200).json({
            success:true,messages:conversation?.messages
        })
    } catch (error) {
        console.log(error,'getMessage api error')
    }
}