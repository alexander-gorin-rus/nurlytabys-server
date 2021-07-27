const express = require('express');
const { CategoryCreate, 
        Categories, 
        DeleteCategory, 
        UpdateCategory, 
        GetCategoryToUpdate, 
        GetOneCategory, 
        CategoryUploadVideo,
        CategoryThumbnail,
        CategorySaveVideo
} = require('../controllers/site_management/categories');
const auth = require('../middleware/auth');
const { categoryValidation } = require('../middleware/express-validator');
const router = express.Router();


router.post('/category-video-upload', auth, CategoryUploadVideo);
router.post('/category-thumbnail', auth, CategoryThumbnail);
router.post('/category-save-video', auth, CategorySaveVideo);
router.post('/category-create', auth, categoryValidation, CategoryCreate);
router.get('/categories', Categories);
router.get('/category/:slug', GetOneCategory);
router.get('/get-category-to-update/:id', auth, GetCategoryToUpdate);
router.delete('/category-delete/:slug', auth, DeleteCategory);
router.put('/category-update/:id', auth, UpdateCategory);

module.exports = router;