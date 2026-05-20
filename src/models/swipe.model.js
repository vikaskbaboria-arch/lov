import mongoose,{Schema} from "mongoose";
const swipeSchema = new mongoose.Schema({
   fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },

   toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },

   action: {
      type: String,
      enum: ["like", "pass"],
   },
});
export default mongoose.models.Swipe || mongoose.model("Swipe", swipeSchema)