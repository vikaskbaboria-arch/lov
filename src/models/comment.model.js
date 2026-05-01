import mongoose,{Schema} from "mongoose";
const commentSchema  = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:'true',
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:'true',
    },
    text:{
        type:String,
        req:true
    }
},{timestamps:true})

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)