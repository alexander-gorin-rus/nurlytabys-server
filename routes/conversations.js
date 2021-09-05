const express = require('express');
const { 
    CreateConversation, 
    GetConversationByUserId,
    FindConversation
} = require('../controllers/conversations');

const router = express.Router()


router.post('/create-post', CreateConversation);
router.get('/get-conversation-by-user/:userId', GetConversationByUserId);
router.get('/find-conversation', FindConversation);


module.exports = router;