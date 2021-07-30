const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { UploadImages } = require('../controllers/site_management/images')


router.post('/images-upload', auth, UploadImages);

module.exports = router;