const express = require('express');
const { 
    employeeRegister, 
    authEmployee, 
    employeeLogin, 
    employeeList, 
    GetEmployeeById,
    UpdateEmployee,
    DeleteEmployee,
    GetEmployeeWithTasks
} = require('../controllers/employee');
const auth = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/express-validator');
const router = express.Router();

router.post('/register', registerValidation, employeeRegister);
router.get('/auth-employee', auth, authEmployee);
router.post('/login', loginValidation, employeeLogin);
//router.get('/employee-list', employeeList);
router.get('/employee-list', auth, employeeList);
//router.get('/get-employee-with-tasks', auth, GetEmployeeWithTasks);
router.get('/get-employee-with-tasks/:id', GetEmployeeWithTasks);

//router.get('/get-employee-by-id/:id', GetEmployeeById);
router.get('/get-employee-by-id/:id', auth, GetEmployeeById);

router.put('/update-employee/:id', UpdateEmployee);
//router.put('/update-employee/:id', auth, UpdateEmployee);
router.delete('/delete-employee/:id', auth, DeleteEmployee);

module.exports = router;