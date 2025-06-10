import express from 'express';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import Video from '../models/Video.js';

const upload = multer({ storage });
const router = express.Router();
router.post('/upload', (req, res, next) => {
  upload.single('video')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ message: "Multer error", error: err.message });
    } else if (err) {
      console.error("Other upload error:", err.message);
      return res.status(500).json({ message: "Upload error", error: err.message });
    }

    // If no errors, continue to saving
    const video = new Video({
      title: req.body.title,
      videoUrl: req.file.path,
    });

    video.save()
      .then(() => {
        res.status(201).json({ message: 'Video uploaded', video });
      })
      .catch(saveErr => {
        console.error("MongoDB error:", saveErr.message);
        res.status(500).json({ message: 'Saving video failed', error: saveErr.message });
      });
  });
});


router.get('/', async (req, res) => {
  const videos = await Video.find().sort({ _id: 1 });
  res.json(videos);
});

export default router;
