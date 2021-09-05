const express = require('express');
const { 
    CreatePost, 
    UpdatePost,
    DeletePost,
    GetPostById,
    GetEmployeePosts, 

} = require('../controllers/posts');
const router = express.Router();

router.post('/create-post', CreatePost);
router.put('/update-post/:id', UpdatePost);
router.delete('/delete-post/:id', DeletePost);
router.get('/get-post/:id', GetPostById);
router.get('/get-employee-posts/:employeename', GetEmployeePosts)


module.exports = router;