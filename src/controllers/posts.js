import PostsModel from "../models/posts.js";
import UsersModel from "../models/users.js";
import postValidator from "../validators/post.js";

const PostsController = async () => {
  //private
  var postsModel = await PostsModel();
  var usersModel = await UsersModel();

  //return object
  var t = {};

  t.create = async (req, res) => {
    const data = req.body;
    const validateStatus = postValidator(data);
    if (validateStatus) return res.status(400).json({ error: validateStatus });
    const userId = req.user;
    const userData = await usersModel.getByUuid(userId);

    if (!userData) {
      return res.status(404).json({ error: "User not found!" });
    }

    const authorEmail = userData.email;
    const title = data.title;
    const body = data.body;

    const addPostStatus = await postsModel.addPost(authorEmail, body, title);
    if (!addPostStatus) {
      return res.status(500).json({ error: "Can't add post. Server error!" });
    }

    return res.status(200).json({ success: data });
  };

  t.getAll = async (req, res) => {
    const data = await postsModel.getAll();
    if (!data) {
      return res.status(500).json({ error: "Server error!" });
    }

    return res.status(200).json({ success: data });
  };

  t.getById = async (req, res) => {
    const id = req.params.id;
    const postObject = await postsModel.getById(id);
    if (postObject) {
      return res.status(200).json({ success: postObject });
    } else {
      return res.status(404).json({ error: "Post not found!" });
    }
  };

  return t;
};

export default PostsController;
