const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchOne = async (req, res, next) => {
  try {
    const [onePost] = await Post.fetchOne(req.params.id);
    res.status(200).json(onePost)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateAll = async (req, res, next) => {
  try {
    const post = {
      title: title,
      body: body,
      user: user,
    };
    const resultat = await Post.update(req.params.id ,post );
    res.status(200).json(resultat);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const title = req.body.title;
  const body = req.body.body;
  const user = req.body.user;

  try {
    const post = {
      title: title,
      body: body,
      user: user,
    };
    const result = await Post.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getRandom = async (req, res, next) => {
 
  try {
    const [citation] = await Post.citationRandom();
    res.status(200).json(citation);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// exports.updateAll = (req,res, next) => {


//   try {
//     const posted = {
//       title: title,
//       body: body,
//       user: user,
//     };
//     const resultat = await Post.updateAll(posted);
//     res.status(201).json({ message: 'updated!' });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// }
