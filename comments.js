// Create new server
const express = require("express");
const router = express.Router();

// Import model
const Comment = require("../models/Comment");

// Import middleware
const auth = require("../middleware/auth");

// Import controllers
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

// Routes
router.route("/").get(getComments).post(auth, createComment);

router
  .route("/:id")
  .get(getComment)
  .put(auth, updateComment)
  .delete(auth, deleteComment);

module.exports = router;

