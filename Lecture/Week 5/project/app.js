const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
　
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
　
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@', // 쿠키에 저장되는 데이터를 암호화
    resave: false,    // 요청이 오면 세션을 다시 저장소에 저장
    saveUninitialized: true // 초기화 되지 않은 세션을 강제로 저장
}));

const users = []; //데이터베이스를 써야하지만 복잡한 관계로 파일안에 객체 생성

const findUser = (user_id, user_pwd) => {
    // id와 password가 일치하는 유저 찾는 함수, 없으면 undefined 반환
    return users.find( user => (user.user_id === user_id && user.user_pwd === user_pwd) );
}
const findUserIndex = (user_id, user_pwd) => {
    // 일치하는 유저의 index값(유니크) 반환
    return users.findIndex( user => (user.user_id === user_id && user.user_pwd === user_pwd));
}
app.get('/', (req, res) => {
    const sess = req.session; // 세션 객체에 접근
    console.log(sess.user_uid + 1);
    res.render('index', {
        nickname: sess.user_uid ? users[sess.user_uid]['user_nickname'] : ''
    });
});
app.get('/login', (req, res) => {
    res.render('login'); // login.ejs 랜더링
});
app.post('/login', (req, res) => {
    const body = req.body; // body-parser 사용
    if( findUser( body.user_id, body.user_pwd ) ) {
    // 해당유저가 존재한다면
        req.session.user_uid = findUserIndex( body.user_id, body.user_pwd ); //유니크한 값 유저 색인 값 저장
        res.redirect('/');
    } else {
        res.send('유효하지 않습니다.');
    }
});

app.get('/logout', (req, res) => {
    delete req.session.user_uid;
    res.redirect('/');
});

app.get('/join', (req, res) => {
    console.log(users);
    res.render('join');
});
app.post('/join', (req, res) => {
    const body = req.body;
    if( !findUser(body.user_id, body.user_pwd) ) {
        users.push({
            user_id: body.user_id,
            user_pwd: body.user_pwd,
            user_nickname: body.user_nickname
        });

        res.redirect('/login');
    } else {
        res.send('이미 존재함');
    }
});

app.listen(3000, ()=> {
  console.log('connected 3000 Port!');
});
