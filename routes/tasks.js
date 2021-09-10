const express = require('express');
const { 
    CreateTask,
    UpdateTask,
    GetTaskById,
    DeleteTask,
    GetEmployeeTasks,
    TaskStatus,
    GetAllEmployeeTasks

} = require('../controllers/company_management/tasks');
const router = express.Router();

router.post('/create-task', CreateTask);
router.put('/update-task/:id', UpdateTask);
router.delete('/delete-task/:id', DeleteTask);
router.get('/get-task/:id', GetTaskById);
router.get('/get-employee-tasks/:employeename', GetEmployeeTasks);
router.put('/task-status', TaskStatus);
router.delete('/task-delete/:id', DeleteTask);
router.get('/get-all-tasks/:id', GetAllEmployeeTasks)


module.exports = router;