const db = require('../util/database');

module.exports = class Post {
  constructor(title, body, user) {
    this.title = title;
    this.body = body;
    this.user = user;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM posts');
  }

  static fetchOne(id) {
    return db.execute('SELECT * FROM posts WHERE id = ?', [id])
  }



  static save(post) {
    return db.execute(
      'INSERT INTO posts (title, body, user) VALUES (?, ?, ?)',
      [post.title, post.body, post.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM posts WHERE id = ?', [id]);
  }

  static update(id, post){
    return db.execute('UPDATE posts SET title = ?,body = ?,user=? WHERE id = ? ' , 
    [post.title, post.body, post.user ,id]
    );
  }

  static citationRandom() {
    return db.execute( 'SELECT * FROM posts ORDER BY RAND() LIMIT 1') ;
  }
};
