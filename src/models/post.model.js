import mongoose,{Schema} from "mongoose";


const postSchema = new Schema({
    caption:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    photo:{
       
        type:String,
         required:true,
    },
    isAnonymous:{
        type:Boolean,
        default:false
    },
    totalLikes:{
        type:Number,
        default: 0
    },
    totalComments:{
         type:Number,
         default:0
    },
    tags:{
        type:[String]
    }
},{timestamps:true})

export default mongoose.models.Post || mongoose.model("Post", postSchema)