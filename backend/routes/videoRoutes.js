const express = require('express');
const router = express.Router();
const { uploadVideo, getAllVideos } = require('../controllers/videoController');

router.route('/upload').post(uploadVideo);
router.route('/all').get(getAllVideos);

module.exports = router;
