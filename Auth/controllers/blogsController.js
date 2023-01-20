const { ObjectID } = require("bson");
const Blog = require("../models/blogSchema.js");

async function blogs_get(req, res) {
  try {
    const results = await Blog.find();
    res.status(200).json(results);
  } catch (err) {
    res.send(err);
  }
}

async function blogs_get_by_id(req, res) {
  if (ObjectID.isValid(req.params.id)) {
    try {
      const results = await Blog.findOne({ _id: req.params.id });
      res.status(200).json(results);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.status(500).json({ err: `Invalid id passed` });
  }
}

async function blogs_post(req, res) {
  if (req.body.author && req.body.title) {
    try {
      const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(err.message);
    }
  } else {
    res.status(500).json({ err: `Author and Title are required fields.` });
  }
}

async function blogs_patch(req, res) {
  if (ObjectID.isValid(req.params.id)) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      blog.updatedAt = Date.now();

      if (req.body.author) {
        blog.author = req.body.author;
      }
      if (req.body.title) {
        blog.title = req.body.title;
      }
      if (req.body.content) {
        blog.content = req.body.content;
      }

      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.status(500).json({ err: `Invalid id passed` });
  }
}

async function blogs_delete(req, res) {
  if (ObjectID.isValid(req.params.id)) {
    try {
      const result = await Blog.deleteOne({ _id: req.params.id });
      res.json({ deleted: `${req.params.id} is delted sucessfully.` });
    } catch (err) {
      res.send(err);
    }
  } else {
    res.status(500).json({ err: `Invalid id passed` });
  }
}

module.exports = {
  blogs_get,
  blogs_get_by_id,
  blogs_post,
  blogs_patch,
  blogs_delete,
};
