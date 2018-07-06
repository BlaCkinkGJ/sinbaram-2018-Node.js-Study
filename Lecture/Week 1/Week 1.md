

<center> <h1> Node.js 1주차 스터디 </h1>
</center>

---

# Node.js는 
# Javascript 기반이다.

---

# Node.js는
# ==Javascript== 기반이다.

---

<center><h1> Javascript? </h1></center>

---

# 자바스크립트는
# 1995년 탄생했습니다.

---

# 주요 특징으로 다중 패러다임을 가집니다.

---

<!-- 다중 패러다임을 통해 자바스크립트를 설명한다. 결국 제대로 사용하기 위해서는 자바스크립트를 알아야 한다는 점을 강조토록 한다.-->

# 다중 패러다임?
## 객체 지향적 특성
```javascript
function Person(first, last, age, gender, interests) {
  this.name = {
    'first': first,
    'last' : last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
}
```
---

# 다중 패러다임?
## 함수형 언어적 특성

```javascript
function h(x) {
  return x + 1;
}

function g(x) {
  return x * x;
}

function f(x) {
  return x.toString();
}

const y = f(g(h(1)));
console.log(y); // '4'
```

---

# 다중 패러다임?
## 이벤트 기반 프로그래밍

```javascript
var eventsInstance = require('events');
 
var eventEmitter = new eventsInstance.EventEmitter();
 
var connectToTheHandler = function connected() {
   console.log('Test connection was successful.');
  
   eventEmitter.emit('data_received_success');
};
 
console.log("Program has successfully ended!");

```

---

# 이렇게 강력하지만
# 문제가 있었습니다.

---

# 웹에 한정된다는 것입니다.

---

# 기존에 자바스크립트 실행하기
# 위해서는 무조건 ==웹 기반==으로 
# 작성해야 했습니다.

---

# 예제
```HTML
<!DOCTYPE html>
<html>
<body>

<script>
let i = 0;
let result = "";
for(i = 0; i < 5; i++)
	result += "The number is " + i + "<br>";
document.write(result);
</script>
</body>
</html>
```
<!-- 최근에 Chrome이나 firefox는 console.log를 사용해서 이렇게 하지 않고도 디버그 할 수 있다.
디버그의 문제로 접근해서 설명하도록 한다.-->

---

# 이렇게 좋은 걸 ==단독==으로 쓸 수가 없네

---


# 웹을 벗어나서 사용해보자!

---

<center><img src = "http://creative.stage5.com.ng/blog/wp-content/uploads/2018/04/nodejs-1024x1024.png" width = 70% height = 70%></img></center>


---

# Node.js의 특징
- V8 엔진을 기반으로 한다. <!-- 구글에서 만든 자바스크립트 엔진입니다. -->
- 이벤트 기반 방식이다. <!-- 다중 쓰레드는 접속자가 많아지면 많아질수록 메모리 자원의 소모가 심해집니다. 이를 해결하기 위해 단일 쓰레드 기반으로 만들어서 클라이언트가 요청하면 이벤트가 발생하여 서버 내부에 메시지로 만들어지고 이런 메시지로 만들어진 것은 서버 내부에서 이벤트 루프가 처리합니다. 이벤트 루프가 처리하는 동안 제어권은 다음 요청으로 넘어가고 처리가 완료되면 Callback을 호출하여 호출측에 알리도록 합니다. 즉, 비동기식 방법임을 의미합니다. 뒤에가서 알아보도록 하겠습니다. --> 
- 프론트엔드와 백엔드를 동시에 작업 가능하다.

---

# Node.js의 설치
설치가 완료되면 아래의 명령어를 CMD(혹은 터미널)에서 쳐주시길 바랍니다.

`node --version`

이 때의 결과는 다음과 같아야 합니다.

```text
C:\Users\MyUser>node --version
v8.11.3

C:\Users\MyUser>
```

---

<!-- *template: invert -->

# 간단한 웹 앱의 구현

---

# 간단한 웹 앱의 구현
아래의 코드 `sample.js` 파일을 만들어 입력해주시길 바랍니다.
```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let i = 0;
  let result = "";
    for(i = 0; i < 5; i++)
      result += "The number is " + i + "\n";
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

<!-- let과 var, const의 차이점을 설명하도록 한다.-->

---

# 간단한 웹 앱의 구현
입력을 하였다면 `sample.js`가 있는 폴더로 가서 CMD를 실행시키고 아래의 명령어를 입력해주시길 바랍니다.
`node sample.js`

이 경우 결과는
- CMD : `Server running at http://127.0.0.1:3000`
- 웹 : 기존 자바스크립트 예제와 결과가 같음

---

# 모듈

---

# 모듈
다시 코드를 봅시다.
```javascript
const http = require('http'); 

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  let i = 0;
  let result = "";
    for(i = 0; i < 5; i++)
      result += "The number is " + i + "\n";
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
<!-- require를 쓰면 http 모듈을 가져옴을 이야기 합니다. 여기서 const는 값을 한 번 할당을 하면 바뀌지 않음을 의미합니다. docs에 들어가서 HTTP를 확인하도록 한다. http -> createServer -> server.listener가 된다.-->

---

# 모듈
OS 모듈의 사용해봅시다.
```javascript
var o = require('os');
console.log(o.platform());
```
이 때, 결과 값은 본인 OS 플랫폼에 관한 정보가 나와야 합니다.
(ex. win32)

---

# NPM

---

# NPM
Node.js의 외부 패키지를 다운받을 수 있게 해주는 도구입니다. 
일종의 Node.js의 구글 스토어라 생각하시면 됩니다.

이런 Node.js가 하는 일로는
- 패키지 설치
- 패키지 삭제
- 패키지 업그레이드
- 패키지 의존성 관리

---

# NPM
1. NPM에서 uglify-es를 설치하도록 합니다. 아래와 같은 명령어를 CMD창에 입력해주시길 바랍니다.
`npm install uglify-es -g`
<!-- 여기서 g의 의미는 globally를 의미합니다. -->
2. 이런 다음 아까 작성한 `sample.js` 파일이 있는 폴더로 가서 아래의 명령어를 실행 하도록 합니다.
`uglifyjs sample.js -m`
<!-- 코드 난독화를 실시하도록 한다. -->

---

# Callback 함수

---

# Callback 함수
CMD에서 한줄 한줄 명령어를 실행하기위해 아래의 명령어를 쳐주시길 바랍니다.
`node`

그 후에 아래의 명령을 **한 줄에** 쳐 주시길 바랍니다.
```javascript
a = [3, 1, 2]; a.sort(); console.log(a);
```

이를 어떻게 역순으로 출력을 하게 만들 수 있을까요?

<!-- node js sort에 대한 기술문서를 찾아보도록 한다. -->

---

# Callback 함수
아래와 같이 수정을 하면 우리가 원하는 결과를 얻을 수 있습니다.
(동일하게 **한 줄**로 작성해주시길 바랍니다.)
```javascript
> a = [3, 1, 2]; function b(v1, v2){return v2 - v1}; 
  a.sort(b); console.log(a);
```

여기서 b는 ==callback  함수==가 됩니다.

---

# Callback 함수

결론적으로, Callback 함수는 함수 호출 실행 시점을 프로그래머가 아닌 시스템에서 결정하는 함수를 지칭합니다.

---

# 과제
앞에서 소스코드 `a = [3, 1, 2]; function ...`의 Callback 함수를 사용하나 `b`와 같은 방식이 아닌 ==익명함수==와 그러한 익명함수를 ==반환 하는 함수==로 구현해주시길 바랍니다.

*hint*
후자의 경우 a.sort(b())가 정렬 실행 부분이 된다.

---

# 감사합니다.
