import mongoose,{Schema} from "mongoose";
const likeSchema  = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:'true',
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:'true',
    }
},{timestamps:true})
likeSchema.index({ user: 1, post: 1 }, { unique: true });
export default mongoose.models.Like || mongoose.model("Like", likeSchema)