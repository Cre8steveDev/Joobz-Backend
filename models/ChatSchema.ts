import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types;

// Chat Schema
const ChatSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'Users' },
    title: String,
    messages: [
      { role: String, message: String, date: String, photo_url: String },
    ],
  },
  { timestamps: true }
);

export default ChatSchema;
