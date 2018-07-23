

<center> <h1> Node.js 4주차 스터디 </h1>
  <h2> 파일 업로드및 데이터베이스의 사용 </h2>
</center>

---

# 파일 업로드

사용자가 업로드한 파일을 서버의 디렉토리에 저장하는 방법을 
알아봅시다.

---

# Multer

Multer는 multipart/form-data를 처리하기 위한 Node.js의 미들웨어.
[Multer github](https://github.com/expressjs/multer) 페이지를 참고해봅시다.

![](images/multer1.jpg)

---

# Multer install

```text
PS C:\Users\User> npm install multer --save
npm WARN package@1.0.0 No description
npm WARN package@1.0.0 No repository field.

+ multer@1.3.1
added 21 packages in 2.116s
```
---

# Upload form

```html
<html>
    <head>
        <meta charset = "utf-8">
    </head>
    <body>
        <form action = 'upload' method = 'post' enctype = "multipart/form-data">  
            <p>
                <input type = "file" name = "userfile">
            </p>
            <p>
                <input type = "submit">
            </p>
        </form>
        
    </body>
</html>
```

form에 **enctype="multipart/form-data**를 추가해야 사용자가 
업로드한 파일을 서버에 전송할 수 있습니다.

---

# Upload form에 맞는 라우터 작성

```javascript
app.get('/upload', (req, res) => {
    //upload.html 파일 보여주기
})

app.post('/upload', (req, res) => {
    res.send("Uploaded!");
})
```

--- 

# Response render 메소드

![](images/res-render.jpg)

* <span style="font-size:80%">view를 화면에 뿌리고, 뿌려진 HTML string을 client에 전달</span>
* <span style="font-size:80%">view는 절대경로이거나 views setting값에 대한 상대경로 이어야 함.</span>
* <span style="font-size:80%">view path가 확장자를 포함하지 않는 경우 view engine setting값으로 파일의 확장자를 결정합니다.</span>

---

# Express app Settings

```javascript
app.set(name, value);
```

```javascript
app.get(name);
```

---

# Special names

![](images/special-names.jpg)

```javascript
app.set('views', './views_file');
app.set('view engine', 'html')
app.engine('html', ejs.renderFile);
```

---

# 실습해봅시다!

```javascript
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const ejs        = require('ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('views', './views_file');
app.set('view engine', 'html')
app.engine('html', ejs.renderFile);

app.get('/upload', (req, res) => {
    res.render('upload');
})

app.post('/upload', (req, res) => {
    res.send("Uploaded!");
})

app.listen(3000, function(){
    console.log('Connected 3000 port!');
});
```

---

## Multer로 업로드 된 파일을 디렉토리에 저장

Multer github의 README 참고

<img src = images/multer2.jpg width = 100% height = 100%></img>

---


```html
...
<input type = "file" name = "userfile"> 
...
```
```javascript
const multer     = require('multer')
const upload     = multer({ dest: 'uploads/' })

...

app.post('/upload', upload.single('userfile'), (req, res) => {
    console.log(req.file);
    res.send("Uploaded! : " + req.file.filename);
})
```
---

# Multer 심화
사용자 업로드 파일에 대해서 좀더 부가적인 처리를 해주고 싶은데...

---

```javascript
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage })
```

---

# 데이터베이스의 사용

데이터베이스란 데이터를 저장하고 꺼내보고 고도로 다뤄볼수있는 

인간에 비유하면 뇌 또는 심장을 담당

정보를 다루는 일을 하기위해서 데이터베이스를 연구하는것은 굉장히 중요

데이터베이스는 특정한 제품을 나타내는게 아닌 제품들을 아우르는 제품군을 나타내는 말

데이터베이스에 해당하는 여러가지 소프트웨어가 존재하고, 그 소프트웨어는 크게 관계형 데이터베이스와 관계형 데이터베이스가 아닌 것으로 나눌 수 있다.

관계형 데이터베이스에 속하는 데이터베이스의 패러다임은 지난 4~50년간 it세계를 지배하던 가장 중요하던 패러다임 중 하나. 그들 중 대표적인 관계형 데이터베이스는 ORACLE, MYSQL, SQL_SERVER

데이터베이스를 한다고 하면 관계형 데이터베이스를 다룬다는 말과 동급이었다.

데이터베이스를 처음으로 하는 사람들은 관계형 데이터베이스를 먼저 하고 가는것을 추천

NoSQL 은 not only sql의 약자이고, 관계형 데이터베이스가 아닌 다양한 데이터베이스가 출현하게 되는 키워드임.
