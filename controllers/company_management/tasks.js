const Task = require('../../models/Task');
const Employee = require('../../models/Employee');
const TasksCount = require('../../models/TasksCount');

exports.CreateTask = async (req, res) => {
  try {
    const task = await new Task(req.body)
        .save();
        res.json({
            success: true,
            task
        })
} catch (err) {
    return res
        .status(400)
        .json({ errors: [{ 
            msg: 'Ошибка при создании задания' 
    }]});
}
}

exports.UpdateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.employeeId === req.body.employeeId) {
          await task.updateOne({ $set: req.body });
          res.status(200).json("the task has been updated");
        } else {
          res.status(403).json("you can update only your task");
        }
      } catch (err) {
        res.status(500).json(err);
      }
}


exports.GetTasksByEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const tasks = await Task.find({ employee: employee._id })
      .populate('employee')
      .populate('comments')
      res.status(200).json({tasks, length: tasks.length});
    } catch (err) {
      res.status(500).json(err);
    }
}


exports.GetTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
          .populate('employee')
          .exec();      
        res.json({
          task
        });
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.TaskCompleted = async (req, res) => {
  const task = await Task.findById(req.params.taskId).exec();
  const employee = await Employee.findById(req.employee.id).exec();
  const { done } = req.body

  //check if currently lodded in employee have already added rating to this task
  let existingRatingObject = task.completed.find(
      (elem) => elem.byEmployee.toString() === employee._id.toString()
  );

  if (existingRatingObject === undefined) {
      let taskStatusComplete = await Task.findByIdAndUpdate(
          task._id,
          {
              $push: { completed: { done, byEmployee: employee._id } },
          },
          { new: true }
      ).exec();
      console.log("task status changed", taskStatusComplete);
      res.json(taskStatusComplete)
  } else {
      //if an employee has already task status changed, update it
      const taskStatusCompletedUpdate = await Task.updateOne(
          {
              completed: { $elemMatch: existingRatingObject }
          },
          { $set: { "completed.$.done": done } },
          { new: true }
      ).exec();
      console.log("taskStatusCompletedUpdate", taskStatusCompletedUpdate);
      res.json(taskStatusCompletedUpdate)
  }
}

// Read it as Past Simple
exports.TaskRead = async (req, res) => {
  const task = await Task.findById(req.params.taskId).exec();
  const employee = await Employee.findById(req.employee.id).exec();
  const { ok } = req.body

  //check if currently lodded in employee have already added rating to this task
  let existingReadObject = task.read.find(
      (elem) => elem.byEmployee.toString() === employee._id.toString()
  );

  if (existingReadObject === undefined) {
      let taskStatusRead = await Task.findByIdAndUpdate(
          task._id,
          {
              $push: { read: { ok, byEmployee: employee._id } },
          },
          { new: true }
      ).exec();
      console.log("task read status is ok", taskStatusRead);
      res.json(taskStatusRead)
  } else {
      //if an employee has already task status changed, update it
      const taskStatusReadUpdate = await Task.updateOne(
          {
              read: { $elemMatch: existingReadObject }
          },
          { $set: { "read.$.ok": ok } },
          { new: true }
      ).exec();
      console.log("taskStatusReadUpdate", taskStatusReadUpdate);
      res.json(taskStatusReadUpdate)
  }
}

exports.UpdateTaskByEmployee = async (req, res) => {
  const employee = await Employee.findById(req.employee.id).exec();
  const { comment } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.taskId, 
    {
      $push: {comments: {comment, byEmployee: employee._id}}
    },
    { new: true }
  ).exec();
  res.json(task)
}

exports.DeleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id)
    res.json(deleted)
  } catch (err) {
    console.log(err)
  }
}

exports.GetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate('employee')
      .exec()
    res.status(200).json({
      tasks,
      length: tasks.length
    })
  } catch (err) {
    res.status(500).json(err)
  }
}


exports.DeleteTaskComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    //Pull out comment

    const comment = task.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //Make sure comment exists

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //Check employee
    if (comment.role.toString() !== req.role.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = task.comments
      .map(comment => comment.role.toString())
      .indexOf(req.employee.id);

    task.comments.splice(removeIndex, 1);

    await task.save();

    res.json(task.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

exports.CreateTasksCount = async (req, res) => {
  try {
    const countTasks = await new TasksCount(req.body)
      .save();
      res.json(countTasks)
  } catch (err) {
      return res
          .status(400)
          .json({ errors: [{ 
              msg: 'Ошибка учета количества заданий' 
      }]});
  }
}

exports.UpdateRole = async (req, res) => {
  try {
      const updatedRole = await Role.findByIdAndUpdate(
          req.params.id, 
          req.body, 
          { new: true });
      res.json(updatedRole)
  } catch (err) {
          return res
          .status(400)
          .json({ errors: [{ 
              msg: 'Не удалось изменить роль' 
      }]});
  }
}

exports.TasksCountUpdate = async (req, res) => {
  try {
    const updateTasksCount = await TasksCount.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true });
    res.json (updateTasksCount)
} catch (err) {
        return res
        .status(400)
        .json({ errors: [{ 
            msg: 'Не удалось изменить количество заданий' 
    }]});
}
}

exports.GetTasksCount = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    const tasksCount = await TasksCount.find({ employeeId: employee._id })
      .exec()
    res.status(200).json(tasksCount)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.GetTasksCountById = async (req, res) => {
  try {
    const tasksCount = await TasksCount.findById(req.params.id)
      .exec()
    res.status(200).json(tasksCount)
  } catch (err) {
    res.status(500).json(err)
  }
}