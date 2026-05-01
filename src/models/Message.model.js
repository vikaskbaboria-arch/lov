import mongoose, { Schema } from "mongoose";



const messageSchema=new Schema({
    text:{
        type:String,
        required:true

    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
        required:true
    },
    senderId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})


export default mongoose.models.Message ||
mongoose.model("Message", messageSchema);