# 6주차 http와 Cookie, Session



---
# Contents

- Http란? 
- Cookie와 Session
- 다중 사용자 구현

---

# HTTP(Hyper Text Transfer Protocol)

직역 : 하이퍼 텍스트를 프로토콜로 전송한다.

- 클라이언트와 서버 사이에 이루어지는 요청, 응답 프로토콜이다.

- 웹 브라우저와 웹 서버가 정보를 주고받는 통신방법

- 웹 브라우저는 Request Header를 통해 다양한 정보를 요청하고, 웹 서버는 Response Header를 통해 다양한 정보를 응답한다.

---

# Cookie란 무엇인가?

---

##### 쿠키는 유저들의 효율적이고 안전한 웹 사용을 보장하기 위하여 웹사이트에 널리 사용됨
<br/>

- 쿠키는 웹사이트 접속시 접속자의 개인장치에 다운로드 되고 브라우저에 저장되는 작은 텍스트 파일이다

- 웹사이트는 쿠키를 통해 유저를 인식하고, 유저의 설정과 일부 데이터를 저장한다

---
# cookieParser 패키지 설치 및 실습

```md
npm i cookie-parser --save
```

```md
const express = require('express');
const cookieParser = require('cookie-parser'); // cookie 작업을 할수 있도록 해주는 미들웨어
var app = express();
app.use(cookieParser());

app.get('/count', (req, res) => {

  if (req.cookies.count) {
      var count = parseInt(req.cookies.count);
  }
  else {
    var count = 0;
  }
  count++;
  res.cookie('count', count);
  res.send('count : ' + count);
});

app.listen(3003, () => {
  console.log('Connected 3003 Port!!');
});
```
웹브라우저는 set-cookie에 있는 count = 1이라는 값을 받아서 저장해놓고 웹 서버에 count 값을 보내준다.

---

# 하지만 이러한 코딩은 보안상 문제가 있다
<br/>

---

# 실습 2. signed Cookies
 
```md
const express = require('express');
const cookieParser = require('cookie-parser'); // cookie 작업을 할수 있도록 해주는 미들웨어
var app = express();
app.use(cookieParser('1234@#$!@#ASDF'));

app.get('/count', (req, res) => {

  if (req.signedCookies.count) {
      var count = parseInt(req.signedCookies.count);
  }
  else {
    var count = 0;
  }
  count++;
  res.cookie('count', count, {signed : true});
  res.send('count : ' + count);
});

app.listen(3003, () => {
  console.log('Connected 3003 Port!!');
});
```
---

# 2. Session은 무엇인가?

- Session은 쿠키를 개선한 방식

- 사용자의 컴퓨터와 서버가 통신하는 과정에서 아이디나 비밀번호와 같은 중요한 정보가 오고 간다는 것은 위험한 일이므로 기존의 쿠키가 가지고 있는 기능과 서버쪽에서 데이터를 저장할 수 있는 공간을 잘 결합 

- 쿠키의 방식과는 다르게 사용자의 식별자 즉 id값만 저장한다.

- 사용자가 서버에 접속하여 id 값을 전송하면 그에 맞는 실제 데이터를 서버의 데이터베이스에서 읽어와 사용할 수 있다.

---
<br/>
# Session 패키지 설치 및 기본 예제

```md
npm i express-session --save
```
```md
var express = require('express');
var session = require('express-session');
var app = express();
app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true
}));
app.get('/count', function(req, res){
  if(req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('count : '+req.session.count);
});
app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});
```
<br/>

---
# 3. Session을 통한 단일 사용자 구현
---

#### 코드가 좀 길어 직접 해보겠습니다.

---

# 6주차 과제

github에 올라와 있는 (project폴더) 코드로 시작하셔도 되고 처음부터 본인이 만드셔도 상관없습니다.

지금 코드는 users라는 배열을 사용했는 데, 이를 데이터베이스를 사용하는 형식으로 해서 코드를 수정해주시고, 이 코드의 문제점인 비밀번호가 동일한 두 계정이 생기는 경우 그 비밀번호에 대한 암호화된 데이터 값이 서로 일치하는 문제가 생기는 데, 이 문제를 해결해 주시면 되겠습니다.
---

# 감사합니다


