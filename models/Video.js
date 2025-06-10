import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
});

export default mongoose.model('Video', videoSchema);
