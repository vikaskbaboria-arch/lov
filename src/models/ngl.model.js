import mongoose,{Schema} from "mongoose";
const NglSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    isAnnonymous:{
        type:Boolean,
        default:false
    },
      createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // seconds
    },
},
{timestamps:true})

export default mongoose.models.Ngl ||
mongoose.model("Ngl", NglSchema);