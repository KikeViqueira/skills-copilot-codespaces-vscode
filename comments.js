// Create web server
const express = require('express');
const router = express.Router();
const db = require('../models');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;

// Get Comments
router.get('/', (req, res) => {
  Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Post,
        attributes: ['title']
      }
    ]
  }).then(comments => {
    res.json(comments);
  });
});

// Get Single Comment
router.get('/:id', (req, res) => {
  Comment.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Post,
        attributes: ['title']
      }
    ]
  }).then(comment => {
    res.json(comment);
  });
});

// Create Comment
router.post('/', (req, res) => {
  Comment.create({
    body: req.body.body,
    userId: req.body.userId,
    postId: req.body.postId
  }).then(comment => {
    res.json(comment);
  });
});

// Update Comment
router.put('/:id', (req, res) => {
  Comment.update(
    {
      body: req.body.body,
      userId: req.body.userId,
      postId: req.body.postId
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(comment => {
    res.json(comment);
  });
});

// Delete Comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then(comment => {
    res.json(comment);
  });
});

module.exports = router;

