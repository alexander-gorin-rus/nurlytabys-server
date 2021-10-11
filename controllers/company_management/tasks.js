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


exports.TaskOpened = async (req, res) => {
  const task = await Task.findById(req.params._id).exec();
  const employee = await Employee.findById(req.employee._id).exec();
  const { open } = req.body

  //check if currently lodded in employee have already added rating to this task
  let existingRatingObject = task.opened.find(
      (elem) => elem.byEmployee.toString() === employee._id.toString()
  );

  if (existingRatingObject === undefined) {
      let taskStatusComplete = await Task.findByIdAndUpdate(
          task._id,
          {
              $push: { opened: { open, byEmployee: employee._id } },
          },
          { new: true }
      ).exec();
      console.log("task status changed", taskStatusComplete);
      res.json(taskStatusComplete)
  } else {
      //if an employee has already task status changed, update it
      const taskStatusCompletedUpdate = await Task.updateOne(
          {
              opened: { $elemMatch: existingRatingObject }
          },
          { $set: { "opened.$.open": open } },
          { new: true }
      ).exec();
      console.log("taskStatusCompletedUpdate", taskStatusCompletedUpdate);
      res.json(taskStatusCompletedUpdate)
  }
}


//exports.TaskCompleted = async (req, res) => {
  // const employee = await Employee.findById(req.employee.id).exec();
  // const { done } = req.body;
  // const task = await Task.findByIdAndUpdate(req.params.taskId, 
  //   {
  //     $push: {completed: {done, byEmployee: employee._id}}
  //   },
  //   { new: true }
  // ).exec();
  // res.json(task)


  // try {
  //   const employee = await Employee.findById(req.employee.id).exec();
  //   const { done } = req.body;
  //   const task = await Task.findByIdAndUpdate(req.params.taskId,
  //     { 
  //       $push: {completed: {done, byEmployee: employee._id}} 
  //     },
  //     { new: true }
  //   ).exec()
  //   res.json(task)
  // } catch (err) {
  //   console.log(err)
  // }

  // try {
  //   const task = await Task.findById(req.params.taskId);
  //   //Check if task status completed was already changed by employee
  //   if(task.completed.byEmployee.filter(statusDone = statusDone.byEmployee.toString() === req.employee._id).length > 0){
  //     return res.status(400).json({
  //       msg: 'Вы уже изменили статус задания на `Выполнено`'
  //     })
  //   }

  //   task.completed.done.unshift({employee: req.employee._id});

  //   await task.save();

  //   res.json(task.completed.done)
  // } catch (err) {
    
  // }
//}

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