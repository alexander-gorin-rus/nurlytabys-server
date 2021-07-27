const express = require('express');
const {  
    Thumbnails, 
    UploadVideo, 
    GetVideo, 
    GetVideos,
    SaveVideo,
    DeleteVideo,
    UpdateVideo,
    GetSingleVideo
} = require('../controllers/site_management/videos');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/video-upload', auth, UploadVideo);
router.post('/thumbnail', Thumbnails);
router.post('/save-video', auth, SaveVideo);
router.get('/getVideo/:slug', GetVideo);
router.get('/get-video/:id', GetSingleVideo);
router.get('/get-videos', GetVideos);
router.put('/update-video/:id', UpdateVideo)
router.delete('/delete-video/:slug', auth, DeleteVideo);

module.exports = router
