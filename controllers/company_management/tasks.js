const Task = require('../../models/Task');
const Employee = require('../../models/Employee');
const Role = require('../../models/Role');

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


// exports.GetTasksByRoleId = async (req, res) => {
//   try {
//     const role = await Role.findById(req.params.id);
//     const tasks = await Task.find({ role: role._id })
//       .populate('role')
//       res.status(200).json({tasks, length: tasks.length});
//     } catch (err) {
//       res.status(500).json(err);
//     }
// }

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


exports.GetEmployeeTasks = async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeename: req.params.employeename });
        const posts = await Task.find({ employeeId: employee._id });
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
}

// exports.TaskStatus = async (req, res) => {
//   try {
//     const { taskId, completed } = req.body;
//     let updatedTask = await Task.findByIdAndUpdate(
//       taskId,
//       { completed },
//       { new: true }
//     ).exec()
//     res.json(updatedTask)
//   } catch (err) {
//     console.log(err)
//   }
// }

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

exports.UpdateTaskByEmployee = async (req, res) => {
    const employee = await Employee.findById(req.employee.id).exec();
    const { comment } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.taskId, 
      {
        $push: {comments: {comment, byEmployee: employee._id}}
      },
      { new: true }
    )
    .exec();
    res.json(task)


  //   let isExistingObject = await task.comments.find(
  //     (elem) => elem.byEmployee.toString() === employee._id.toString()
  //   )
     
  // if(isExistingObject === undefined){
  //   const commentAddedToTask = await Task.findByIdAndUpdate(
  //     task._id,
  //     {
  //       $push: {comments: {comment, byEmployee: employee._id}}
  //     },
  //     { new: true }
  //   ).exec()
  //   console.log('Comment was successfully added to task', commentAddedToTask);
  //   res.json(commentAddedToTask)
  // }else{
  //   const commentUpdatedInTask = await Task.updateOne(
  //     {
  //       comments: {$elemMatch: commentAddedToTask}
  //     },
  //     { $set: {"comments.$.comment": comment} },
  //     { new: true }
  //   ).exec();
  //   console.log('Comment was successfully changed');
  //   res.json(commentUpdatedInTask)
  // }
}

// exports.UpdateTaskByEmployee = async (req, res) => {
//   const comment = {
//     text:req.body.text,
//     postedBy:req.employee.role._id
// }
// Task.findByIdAndUpdate(req.body.taskId,{
//     $push:{comments:comment}
// },{
//     new:true
// })
// .populate("comments.postedBy","_id name")
// .populate("postedBy","_id name")
// .exec((err,result)=>{
//     if(err){
//         return res.status(422).json({error:err})
//     }else{
//         res.json(result)
//     }
// })
// }


// exports.UpdateTaskByEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.employee.id)
//     const task = await Task.findById(req.params.id);

//     const newComment = {
//       byEmployee: req.employee.id,
//       comment: req.body.comment,
//       name: employee.name,
//     };

//     task.comments.unshift(newComment);
//     //task.comments.push(newComment);

//     await task.save();
//     res.json(task.comments);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// }

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

    //Check user
    if (comment.role.toString() !== req.role.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = task.comments
      .map(comment => comment.role.toString())
      .indexOf(req.user.id);

    task.comments.splice(removeIndex, 1);

    await task.save();

    res.json(task.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}