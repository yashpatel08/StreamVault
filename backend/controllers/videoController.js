const Video = require('../models/Video');

const uploadVideo = async (req, res) => {
    const { videoUrl, username, userId } = req.body;

    if (!videoUrl || !username || !userId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newVideo = new Video({
            videoUrl,
            username,
            userId
        });

        await newVideo.save();
        res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ uploadedAt: -1 });
        res.status(200).json(videos);
        console.log();
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { uploadVideo, getAllVideos };