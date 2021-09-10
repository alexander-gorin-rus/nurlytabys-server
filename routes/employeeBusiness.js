const express = require('express');
const { 
    CreateEmployeeBusiness,
    GetEmployeeBusiness
} = require('../controllers/company_management/employeeBusiness');
const router = express.Router();

router.post('/create-employee-business', CreateEmployeeBusiness);
router.get('/get-employee-business/:id', GetEmployeeBusiness);

module.exports = router;