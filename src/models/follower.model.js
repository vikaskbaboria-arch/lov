import mongoose from "mongoose";
import {Schema} from "mongoose";

const followSchema = new Schema({
    followingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    followerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }

},
{timestamps:true})

followSchema.index({ followingId: 1, followerId: 1 }, { unique: true });
export default mongoose.models.Follow || mongoose.model("Follow", followSchema);