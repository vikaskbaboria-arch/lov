import mongoose,{Schema} from "mongoose";

const conversationSchema= new Schema({
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    
    }],
    lastmessage:{
        type:String
    },
     lastMessageAt: {
    type: Date
  },

},{timestamps:true})
conversationSchema.index({ members: 1 }, { unique: true });

export default mongoose.models.Conversation || mongoose.model('Conversation',conversationSchema)