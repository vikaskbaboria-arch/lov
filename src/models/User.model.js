import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import {INTERESTS} from "../contants/interest.js";
const UserSchema = new Schema({
    username:{
        required:true,
        type:String,
        minlength:3,
        maxlength:20,
        unique:true
    },
    friends:[
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
    ],
    gender:{
        type:String,
        enum:["male","female","binary","other"],
        
    },
    campus:{
        type:String
    },
    age:{
        type:Number,
        min:16,
        max:30
    }
    ,
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
        
    }
    ,
    lastSeen:{
        type:Date,
        default:Date.now()
            },
    isPosted:{
      type:Boolean,
      default:false
    },

   interests: {
      type: [
        {
          type: String,
          enum: INTERESTS,
          lowercase: true
        }
      ],
      default: [],
      validate: [
        {
          validator: function (arr) {
            return arr.length <= 10;
          },
          message: "You can select up to 10 interests only"
        }
      ]
    },
    datingPreferences:{
   interestedIn:[{
      type:String,
      enum:["male","female","binary","other"]
   }],

   minAge:{
      type:Number,
      default:18
   },

   maxAge:{
      type:Number,
      default:30
   }
}
,photos:{
   type:[String],
   default:[]
}
,
isDatingEnabled:{
    type:Boolean,
    default:false
},
address:{
    city:String,
state:String,
country:String
}
,
location:{
    type:{
        type:String,
        enum:["Point"],
        default:"Point"
    },
    coordinates:{
        type:[Number],
        default:[0,0]
    }
}
},{timestamps:true});

UserSchema.index({
   location:"2dsphere"
});

UserSchema.pre('save', async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.methods.isPasswordCorrect =async function (password){
    return await bcrypt.compare(password,this.password)
}



export default mongoose.models.User || mongoose.model("User",UserSchema)