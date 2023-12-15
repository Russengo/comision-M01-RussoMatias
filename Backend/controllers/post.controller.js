import { CommentModel } from "../models/comment.model.js";
import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";

export const ctrlCreatePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title, description, imageurl } = req.body;
    const post = new PostModel({
      title,
      description,
      imageurl,
      author: userId,
    });

    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlListPost = async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await PostModel.find({ author: userId })
      .populate("author", ["username", "avatar"])
      .populate("comments", ["description", "author", "post"])
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlGetPost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({ _id: postId, author: userId })
      .populate("author", ["username"])
      .populate("comments", ["description", "author", "post"])
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlupdatePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({ _id: postId, author: userId });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    post.set(req.body);

    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlDeletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({ _id: postId, author: userId });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    await CommentModel.deleteMany({ _id: { $in: post.comments } });

    await PostModel.findOneAndDelete({ _id: postId, author: userId });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlGetAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .populate("comments", ["description", "author", "post"])
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      });
    if (!posts) return res.status(404);
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error de Servidor" });
  }
};
