const express = require('express');
const { MainPageUploadVideo,
        MainPageDeleteVideo,
        MainPageGetVideo,
        MainPageSaveVideo,
        MainPageThumbnail,
        MainPageUpdateVideo,
        GetMainPageInfo
} = require('../controllers/site_management/mainPageInfo')
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/main-page-video-upload', auth, MainPageUploadVideo);
router.post('/main-page-thumbnail', MainPageThumbnail);
router.post('/main-page-save-video', auth, MainPageSaveVideo);
router.get('/main-page-get-video', MainPageGetVideo);
router.delete('/main-page-delete-video/:slug', auth, MainPageDeleteVideo);
router.put('/main-page-update-video/:id', auth, MainPageUpdateVideo);
router.get('/main-page-get-info/:id', GetMainPageInfo)

module.exports = router