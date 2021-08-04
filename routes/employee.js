const express = require('express');
const { 
    employeeRegister, 
    authEmployee, 
    employeeLogin, 
    employeeList, 
    GetEmployeeById
} = require('../controllers/employee');
const auth = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/express-validator');
const router = express.Router();

router.post('/register', registerValidation, employeeRegister);
router.get('/auth-employee', auth, authEmployee);
router.post('/login', loginValidation, employeeLogin);
router.get('/employee-list', employeeList);
router.get('/get-employee-by-id/:id', GetEmployeeById);

module.exports = router;