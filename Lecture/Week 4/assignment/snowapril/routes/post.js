const express = require('express');
const router  =  express.Router();
const path = require('path');

const DB = require('../database').DB;

const mainPath = __dirname.slice(0, __dirname.lastIndexOf('\\')); //path of app.js file location

router.use(express.static(path.join(mainPath, '/uploads')));
router.use(express.static(path.join(mainPath, '/public')));

router.get('/', (req, res, next) => {
    
    DB.getPosts("title, image, author", (err, posts) => {
        if (err) {
            res.send("Internal Server Error");
            console.log(err);
        } else {
            console.log(posts[0]);
            res.render("post", { "posts" : posts});
        }
    });
});

module.exports = router;