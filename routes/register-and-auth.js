const express = require('express');
const { 
    registerEntry, 
    getEntry, 
    confirmEntry,
    registerList,
    deleteRegister,
    updateRegister,
    getSingelRegister
} = require('../controllers/register-and-auth');
const entryAuth  = require('../middleware/entryAuth');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/register-entry', registerEntry);
router.get('/get-entry', entryAuth, getEntry);
router.get('/register-list', auth, registerList);
router.get('/get-single-register/:id', getSingelRegister);
router.post('/confirm-entry', confirmEntry);
router.delete('/delete-register/:id', auth, deleteRegister);
router.put('/update-register/:id', auth, updateRegister);


module.exports = router;