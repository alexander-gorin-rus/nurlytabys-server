const Task = require('../../models/Task');
const Employee = require('../../models/Employee');

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

exports.DeleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.employeeId === req.body.employeeId) {
          await task.deleteOne();
          res.status(200).json("the task has been deleted");
        } else {
          res.status(403).json("you can delete only your task");
        }
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.GetTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        const employee = await Employee.find({ task })
            .populate('task')
            .exec();
        res.json({
          task, 
          employee
        });
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.TaskTimeline = async (req, res) => {
    try {
        const currentEmployee = await Employee.findById(req.params.employeeId);
        const employeePosts = await Task.find({ employeeId: currentEmployee._id });
        const friendPosts = await Promise.all(
          currentEmployee.followings.map((friendId) => {
            return Task.find({ employeeId: friendId });
          })
        );
        res.status(200).json(employeePosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.GetEmployeeTasks = async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeename: req.params.employeename });
        const posts = await Task.find({ employeeId: employee._id });
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.TaskStatus = async (req, res) => {
  try {
    const { taskId, completed } = req.body;
    let updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    ).exec()
    res.json(updatedTask)
  } catch (err) {
    console.log(err)
  }
}

exports.DeleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id)
    res.json(deleted)
  } catch (err) {
    console.log(err)
  }
}

exports.GetAllEmployeeTasks = async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);
    const tasks = await Task.find({ employee: user._id })
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
}