import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // who receives notification
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // who triggered notification
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // notification type
    type: {
      type: String,
      enum: [
        "like",
        "comment",
        "follow",
        "message",
        "mention",
      ],
      required: true,
    },

    // related post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    // related comment
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    // optional custom text
    text: {
      type: String,
      default: "",
    },

    // notification seen or not
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    notificationSchema
  );

export default Notification;