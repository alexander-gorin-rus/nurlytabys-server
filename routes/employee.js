const express = require('express');
const { employeeRegister, authEmployee, employeeLogin } = require('../controllers/employee');
const auth = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/express-validator');
const router = express.Router();

router.post('/register', registerValidation, employeeRegister);
router.get('/auth-employee', auth, authEmployee);
router.post('/login', loginValidation, employeeLogin)

module.exports = router;