import mongoose from 'mongoose';

const topicSchema = mongoose.Schema({
  title: { type: String, required: true, max: 50, min: 5 },
  content: { type: String, reqired: true, max: 2048, min: 5 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  replies: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      date: { type: Date },
    },
  ],
});

export default mongoose.model('Topic', topicSchema);
