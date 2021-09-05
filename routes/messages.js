const express = require('express');
const { GetMessageByConversationId, CreateMessage } = require('../controllers/messages');
const router = express.Router();

router.post('/create-message', CreateMessage);
router.get('/get-message-by-conversationId/:conversationId', GetMessageByConversationId)


module.exports = router;