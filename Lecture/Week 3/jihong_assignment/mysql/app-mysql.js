const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs        = require('ejs');
const multer     = require('multer')
const storage    = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload     = multer({ storage: storage })
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'tlswlgmd12',
    database : 'o2'
});
const logger = require('morgan');

connection.connect();

app.locals.pretty = true;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/user', express.static('uploads'));

app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/topic/add', (req, res) => {
    var sql = 'SELECT id, title FROM topic';
    connection.query(sql, (err, topics, fields) => {
        if (err) {
            console.log('Internal server error');
            res.status(500).send("Internal Server Error");
        }
        res.render('add', {topics:topics});
    });
});


app.post('/topic/add', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO topic (title, description, author) Values(?, ?, ?)';
    var params = [title, description, author];
    connection.query(sql, params, (err, result, fields) => {
        if (err) {
            console.log('Error');
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/'+ result.insertId);
        }
    });
});

app.get('/topic/:id/edit', (req, res) => {
    var sql = 'SELECT id, title FROM topic';
    connection.query(sql, (err, topics, fields) => {
        var id = req.params.id;
        if (err) {
              console.log('Error');
              res.status(500).send('Internal Server Error');
        } else {
            if (id) {
                var sql = 'SELECT * FROM topic WHERE id=?';
                var params = [id];
                connection.query(sql, params, (err, rows, fields) => {
                    if (err) {
                        console.log('Error');
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.render('edit', {topics:topics, topic:rows[0]});
                    }
                });
            }
            else {
                res.status(500).send('You enter the wrong page.');
            }   
        }           
    });
});

app.post('/topic/:id/edit', (req, res) => {
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;

    var params = [title, description, author, id];
    connection.query(sql, params, (err, result, fields) => {
        if (err) {
            console.log('Error');
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/' + id);
        }
    });
});


app.get('/topic/:id/delete', (req, res) => {
    var sql = 'SELECT id, title FROM topic';
    var id = req.params.id;

    connection.query(sql, (err, topics, fields) => {
        var sql = 'SELECT * FROM topic WHERE id=?';
        var params = [id];

        connection.query(sql, params, (err, topic, fields) => {
            if (err) {
                console.log('Error');
                res.status(500).send('Internal Server Error');
            } else {
                if (topic.length == 0) {
                    console.log('Error');
                    res.status(500).send('Yor are trying to delete empty Post');
                } else {
                    res.render('delete', {topics:topics, topic:topic[0]});
                }
            }
        });
    });
});

app.post('/topic/:id/delete', (req, res) => {
    var id = req.params.id;

    var sql = 'DELETE FROM topic WHERE id=?';
    var params = [id];

    connection.query(sql, params, (err, topic, fields) => {
        if (err) {
            console.log('Error');
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic');
        }
    });
})

app.get(['/topic', '/topic/:id'], (req, res) => {
    var sql = 'SELECT id,title FROM topic';
    connection.query(sql, (err, topics, fields) => {
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM topic WHERE id = ?';
            var params = [id]
            connection.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.log('Error!');
                    res.status(500).send("Internal Server Error");
                }
                else {
                    res.render('view', {topics:topics, topic:rows[0]})
                }
            });
        }
        else {
            res.render('view', {topics:topics});
        }

    });
});

app.listen(3000, function() {
    console.log("Connected 3000 port!");
}) 
