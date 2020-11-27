import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, min: 3, max: 14, required: true },
  password: { type: String, min: 5, max: 256, required: true },
  email: { type: String, required: true, min: 5, max: 256 },
  registerDate: { type: Date, required: true },
  birthday: { type: Date, required: true },
  description: { type: String, max: 256 },
  imgKey: { type: String },
});

export default mongoose.model('User', userSchema);
