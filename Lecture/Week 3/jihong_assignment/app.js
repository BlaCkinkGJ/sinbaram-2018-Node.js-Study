const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer     = require('multer')
const storage    = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload     = multer({ storage: storage });

const mongodb    = require('mongodb');
const client     = mongodb.MongoClient;
const ObjectId   = mongodb.ObjectId; 
const fs         = require('fs');

app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/user', express.static('uploads'));

app.set('views', './views_file');
app.set('view engine', 'jade');

client.connect('mongodb://localhost:27017/school', {useNewUrlParser : true}, function(error, client){
    if(error) {
        console.log(error);
    } else {
        console.log("Connect to MongoDB success");
        database = client.db('o2');
        collection = database.collection('posting');
        
        collection.remove({});
        
        app.get('/topic/add', (req, res) => {
            collection.find({}, {'_id':1,'title':1,'description':0, 'author':0, 'filename':0}).toArray((err, topics) => {
                if (err) {
                    console.log('Error');
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log(topics);
                    res.render('add', {topics:topics});
                }
            });
        });

        app.post('/topic/add', upload.single('userfile'), (req, res) => {
            var title = req.body.title;
            var description = req.body.description;
            var author = req.body.author;
            var filename = undefined;
            if (req.file)
                var filename = req.file.originalname;
            collection.insert({'title':title, 'description':description, 'author':author, 'filename':filename}, (err, result) => {
                if (err) {
                    console.log('Error');
                    res.status(500).send('Internal Server Error');
                } else {
                    res.redirect('/topic/'+result.ops[0]._id);
                }
            });
        });
        
        app.get('/topic/:id/edit', (req, res) => {
            collection.find({}, {'_id':1,'title':1,'description':0, 'author':0, 'filename':0}).toArray((err, topics) => {
                var id = req.params.id;
                if (err) {
                      console.log('Error');
                      res.status(500).send('Internal Server Error');
                } else {
                    if (ObjectId.isValid(id)) {
                        collection.findOne({'_id':ObjectId(id)}, (err, result) => {
                            if (err) {
                                console.log('Error');
                                res.status(500).send('Internal Server Error');
                            } else {
                                res.render('edit', {topics:topics, topic:result});
                            }
                        });
                    }
                    else {
                        res.status(500).send('You enter the wrong page.');
                    }   
                }           
            });
        });
        
        app.post('/topic/:id/edit', upload.single('userfile'), (req, res) => {
            var title = req.body.title;
            var description = req.body.description;
            var author = req.body.author;
            var id = req.params.id;
            var filename = undefined;
            if (req.file)
                var filename = req.file.originalname;

            if (ObjectId.isValid(id)) {
                collection.updateOne({'_id':ObjectId(id)}, {$set: {'title':title,'description':description,'author':author, 'filename':filename}}, (err, result) => {
                    if (err) {
                        console.log('Error');
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.redirect('/topic/' + id);
                    }
                });
            } else {
                res.redirect('/topic');
            }
        });
        
        app.get('/topic/:id/delete', (req, res) => {
            collection.find({}, {'_id':1,'title':1,'description':0, 'author':0, 'filename':0}).toArray((err, topics) => {
                console.log(topics);
                var id = req.params.id;
                if (ObjectId.isValid(id)) {
                    collection.findOne({'_id':ObjectId(id)}, (err, topic) => {
                        if (err) {
                            console.log('Error!');
                            res.status(500).send("Internal Server Error");
                        }
                        else {
                            res.render('delete', {topics:topics, topic:topic});
                        }
                    });
                }
                else {
                    console.log('Error');
                    res.status(500).send('Yor are trying to delete empty Post');
                }
            });
        });
        
        app.post('/topic/:id/delete', (req, res) => {
            var id = req.params.id;
            
            collection.deleteOne({'_id':ObjectId(id)}, (err, result) => {
                if (err) {
                    console.log('Error!');
                    res.status(500).send("Internal Server Error");
                }
                else {
                    res.redirect('/topic');
                }
            });
        })
        
        app.get('/topic/:id/download', (req, res) => {
            var id = req.params.id;

            if (ObjectId.isValid(id)) {
                collection.findOne({'_id':ObjectId(id)}, (err, result) => {
                    if (err) {
                        console.log('Error!');
                        res.status(500).send("Internal Server Error");
                    }
                    else {
                        if (result.filename) {
                            var file = __dirname + '\\uploads\\' + result.filename;
                            res.download(file); // Set disposition and send it.
                        } else {
                            res.redirect('/topic/'+id);
                        }
                    }
                });
            } else {
                console.log('Error');
                res.status(500).send('Yor are trying to delete empty Post');
            }
        });

        app.get(['/topic', '/topic/:id'], (req, res) => {
            collection.find({}, {'_id':1,'title':1,'description':0, 'author':0, 'filename':0}).toArray((err, topics) => {
                var id = req.params.id;
                if (ObjectId.isValid(id)) {
                    collection.findOne({'_id':ObjectId(id)}, (err, rows) => {
                        if (err) {
                            console.log('Error!');
                            res.status(500).send("Internal Server Error");
                        }
                        else {
                            console.log(rows);
                            res.render('view', {topics:topics, topic:rows})
                        }
                    });
                }
                else {
                    res.render('view', {topics:topics});
                }
            });
        });
    }
});

app.listen(3000, function() {
    console.log("Connected 3000 port!");
}) 
