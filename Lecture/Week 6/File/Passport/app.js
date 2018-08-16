// based on week 5

const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const session       = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users         = [];
const sessionData   = {
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,  
    saveUninitialized: true 
}


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: false}));

app.use(session(sessionData));

app.use(passport.initialize());
app.use(passport.session());


// local strategy 전략을 제작을 하도록 한다.
// login post랑 동일한 내용이라 할 수 있습니다.

passport.serializeUser((user, done)=>{
    console.log("serialize", user);
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    console.log("deserialize", user);
    return done(null, user);
})

passport.use(new LocalStrategy(
    (username, password, done)=>{
        console.log("strategy", username, password);
        if( findUser( username, password ) ) {
            let idx = findUserIndex(username, password);
            done(null, users[idx]);
        } else {
            done(null,  false, { message : "cannot find any user" });
        }
    }
));


app.get('/', (req, res) => {
    const sess = req.session; 
    console.log(req.user);
    res.render('index', {
        nickname: req.user ? req.user.user_id : ""
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


app.get('/join', (req, res) => {
    console.log(users);
    res.render('join');
});

/*
app.post('/login', (req, res) => {
    const body = req.body;
    if( findUser( body.user_id, body.user_pwd ) ) {
        req.session.user_uid = findUserIndex( body.user_id, body.user_pwd );
        res.redirect('/');
    } else {
        res.send('유효하지 않습니다.');
    }
});
*/


app.post('/join', (req, res) => {
    const body = req.body;
    if( !findUser(body.user_id, body.user_pwd) ) {
        user = {
            user_id: body.user_id,
            user_pwd: body.user_pwd,
            user_nickname: body.user_nickname
        }
        users.push(user);
        console.log(users);
        req.login(user, (err)=>{
            // 우리는 session에 현재 저장되는 내용의 없기에 생략한다. 
            res.redirect('/');
        });
        //res.redirect('/login');
    } else {
        res.send('이미 존재함');
    }
});

app.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash    : false
}));


app.listen(3000, ()=> {
  console.log('connected 3000 Port!');
});


// additional function
function findUser(user_id, user_pwd){ 
    return users.find( user => (user.user_id === user_id && user.user_pwd === user_pwd) );
}
function findUserIndex(user_id, user_pwd){
    return users.findIndex( user => (user.user_id === user_id && user.user_pwd === user_pwd));
}