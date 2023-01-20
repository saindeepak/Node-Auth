const express = require("express");
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.get("/", blogsController.blogs_get);

router.get("/:id", blogsController.blogs_get_by_id);

router.post("/", blogsController.blogs_post);

router.patch("/:id", blogsController.blogs_patch);

router.delete("/:id", blogsController.blogs_delete);

module.exports = router;
