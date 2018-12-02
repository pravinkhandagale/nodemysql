const express = require('express');
const mysql = require('mysql');

// Create a connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

db.connect(err => {
  if (err) {
    console.log(err);
  }
  console.log('MySQL Conneted...');
});

// Express App
const app = express();
const PORT = 5000;

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Vooo, Database created.');
  });
});

// Create a post table
app.get('/createposttable', (req, res) => {
  let sql =
    'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(40), body VARCHAR(255), date DATETIME DEFAULT CURRENT_TIMESTAMP,  PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post table created..');
  });
});

// Add post
app.get('/addpost1', (req, res) => {
  let post = {
    title: 'Post One',
    body: 'This is post number one'
  };
  let sql = 'INSERT into posts SET ?';
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post added..');
  });
});

app.get('/addpost2', (req, res) => {
  let post = {
    title: 'Post Two',
    body: 'This is post number two'
  };
  let sql = 'INSERT into posts SET ?';
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post added..');
  });
});

// Show Post
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * from POSTS';
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts Fetched..');
  });
});

// Update Post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post updated..');
  });
});

// Delete Post
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE from posts WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted..');
  });
});

app.get('/', (req, res) => {
  res.send('A NodeJS app using MySQL');
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
