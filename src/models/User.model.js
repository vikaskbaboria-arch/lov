import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    username:{
        required:true,
        type:String,
        minlength:3,
        maxlength:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String
    },
    profilePic:{
        type:String,
        
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:6

    },
    otp:{
        type:String
    },
    otpexpiry:{type:Date},
    isVerified:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    bio:{
        type:String,
        maxlength:160,
        
    },
    lastSeen:{
        type:Date,
        default:Date.now()
            }


},{timestamps:true});


UserSchema.pre('save', async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.methods.isPasswordCorrect =async function (password){
    return await bcrypt.compare(password,this.password)
}



export default mongoose.models.User || mongoose.model("User",UserSchema)