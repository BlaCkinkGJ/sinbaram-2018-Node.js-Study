var express = require ('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/form_receiver',function(req,res){
    //var title = req.query.title;
   // var description = req.query.description;
    res.send('send');
});
// app.post('/form_receiver',function(req,res){
//     var title = req.body.title;
//     var description = req.body.description;
//     res.send(title + ',' + description);
// });

app.listen(3000,function(){
    console.log('Connected 3000 port!');
});