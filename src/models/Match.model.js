import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
   users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   }],

   matchedAt: {
      type: Date,
      default: Date.now,
   },

   isActive: {
      type: Boolean,
      default: true,
   },
});
export default mongoose.models.Match || mongoose.model("Match", matchSchema)