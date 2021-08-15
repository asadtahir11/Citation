const express = require('express');

const { body } = require('express-validator');

const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, postsController.fetchAll);

router.get('/:id', auth, postsController.fetchOne);

router.post(
  '/',
  [
    auth,
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  postsController.postPost
);

router.delete('/:id', auth, postsController.deletePost);

router.get('/random', auth,postsController.getRandom );

router.put('/:id', auth , postsController.updateAll );

module.exports = router;
