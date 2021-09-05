const Post = require('../models/Post');
const Employee = require('../models/Employee');

exports.CreatePost = async (req, res) => {
    const newPost = new Post;

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.UpdatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.employeeId === req.body.employeeId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("the post has been updated");
        } else {
          res.status(403).json("you can update only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.DeletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.employeeId === req.body.employeeId) {
          await post.deleteOne();
          res.status(200).json("the post has been deleted");
        } else {
          res.status(403).json("you can delete only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.GetPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.PostTimeline = async (req, res) => {
    try {
        const currentEmployee = await Employee.findById(req.params.employeeId);
        const employeePosts = await Post.find({ employeeId: currentEmployee._id });
        const friendPosts = await Promise.all(
          currentEmployee.followings.map((friendId) => {
            return Post.find({ employeeId: friendId });
          })
        );
        res.status(200).json(employeePosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
}

exports.GetEmployeePosts = async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeename: req.params.employeename });
        const posts = await Post.find({ employeeId: employee._id });
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json(err);
      }
}