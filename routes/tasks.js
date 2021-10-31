const express = require('express');
const { 
    CreateTask,
    UpdateTask,
    GetTaskById,
    DeleteTask,
    //GetEmployeeTasks,
    GetAllTasks,
    UpdateTaskByEmployee,
    DeleteTaskComment,
    GetTasksByEmployee,
    TaskCompleted,
    TaskRead,
    GetTasksCount,
    TasksCountUpdate,
    CreateTasksCount

} = require('../controllers/company_management/tasks');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-task', CreateTask);
router.put('/update-task/:id', UpdateTask);
router.put('/task-completed/:taskId', auth, TaskCompleted);
router.put('/task-read/:taskId', auth, TaskRead);
router.delete('/delete-task/:id', DeleteTask);
router.get('/get-task/:id', GetTaskById);
router.get('/tasks-count/:id', GetTasksCount);
router.post('/tasks-count-create', CreateTasksCount);
//router.post('/tasks-count-create', auth, CreateTaskCount);
router.post('/tasks-count-update/:taskId', TasksCountUpdate);
//router.get('/get-employee-tasks/:employeename', GetEmployeeTasks);
router.post('/task-update/comment/:taskId',auth, UpdateTaskByEmployee);
router.delete('/task-delete/:id', DeleteTask);
router.delete('/comment/:taskId/:commentId', DeleteTaskComment);
router.get('/get-tasks-by-employee/:id', GetTasksByEmployee);
router.get('/get-all-tasks', GetAllTasks);


module.exports = router;