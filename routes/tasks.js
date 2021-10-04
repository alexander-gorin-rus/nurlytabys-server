const express = require('express');
const { 
    CreateTask,
    UpdateTask,
    GetTaskById,
    DeleteTask,
    GetEmployeeTasks,
    GetTasksByRoleId,
    GetAllTasks,
    UpdateTaskByEmployee,
    DeleteTaskComment

} = require('../controllers/company_management/tasks');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-task', CreateTask);
router.put('/update-task/:id', UpdateTask);
router.delete('/delete-task/:id', DeleteTask);
router.get('/get-task/:id', GetTaskById);
router.get('/get-employee-tasks/:employeename', GetEmployeeTasks);
router.put('/task-update/comment/:taskId', UpdateTaskByEmployee);
//router.post('/task-update/comment/:taskId', UpdateTaskByEmployee);
router.delete('/task-delete/:id', DeleteTask);
router.delete('/comment/:taskId/:commentId', DeleteTaskComment);
router.get('/get-tasks-by-role/:id', GetTasksByRoleId);
router.get('/get-all-tasks', GetAllTasks);


module.exports = router;