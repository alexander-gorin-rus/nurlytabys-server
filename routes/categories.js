const express = require('express');
const { CategoryCreate, 
        Categories, 
        DeleteCategory, 
        UpdateCategory, 
        update,
        GetCategoryToUpdate, 
        GetOneCategory } = require('../controllers/site_management/categories');
const auth = require('../middleware/auth');
const { categoryValidation } = require('../middleware/express-validator');
const router = express.Router();

router.post('/category-create', auth, categoryValidation, CategoryCreate)
router.get('/categories', Categories);
router.get('/category/:slug', GetOneCategory);
router.get('/get-category-to-update/:id', auth, GetCategoryToUpdate);
router.delete('/category-delete/:slug', auth, DeleteCategory);
router.put('/category-update/:id', auth, UpdateCategory);

module.exports = router;