const express = require('express');
const { 
    CreateBusiness, 
    GetAllBusinesses,
    GetBusinessById,
    UpdateBusiness,
    DeleteBusiness,
} = require('../controllers/company_management/business');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/business-create', auth, CreateBusiness);
router.get('/get-all-businesses', auth,  GetAllBusinesses);
router.get('/get-business-by-id/:id', auth,  GetBusinessById);
router.put('/update-business/:id',  auth, UpdateBusiness);
router.delete('/delete-business/:id',  auth, DeleteBusiness);

module.exports = router;