<center><font size ="9"> synchronous & 'A'synchronous</center></font><br>

<br>
<br>
<br>




<center> <h6> #강의 내용은 Youtube 채널 생활코딩을 참조하였습니다. </h6>
</center>

---
# CallBack 함수 복습
객체의 상태 변화 (이벤트) 가 발생하였을 경우에 이러한 사실을 전달하는 함수.

```
pm = function(a ,b ,callback){
    callback(a+b , a-b);
}

pm(5,10,function(res1 ,res2){
    console.log(res1);
    console.log(res2);
})
```
---
# 동기 입출력 방식
동기란 동시에 일어난다는 의미로, 요청이 들어오면 바로 처리를 기다린 후 결과 값을 주는 방식이다.
따라서 동기방식은 시간이 얼마가 걸리든 결과를 기다리게 된다.<br>

**( C와 C++을 비롯한 C style 이 대표적이다 )**

---
# 비동기 입출력 방식
비동기란 동시에 일어나지 않는다는 의미로, 요청이 들어오면 처리를 기다리지 않고, 작업이 완료되는 순간 시스템에서 결과 값을 주는 방식이다.
요청시각과 출력시각이 일치하지 않으므로 처리시간동안 다른 작업을 할 수 있다.

---
# 비동기 입출력 방식

<center><img src = "C:\Users\wodnj\Documents\GitHub\2018_node_js_study\Lecture\Week 2\Diagram.PNG" width = 500% height = 500%></img></center>


---

# 작업 방식의 차이
<center><img src = "C:\Users\wodnj\Documents\GitHub\2018_node_js_study\Lecture\Week 2\Comparison.PNG" width = 500% height = 500%></img></center>


<br>
1. 동기적 처리(synchronous) - 순차적인 업무처리
<br><br>
2. 비동기적 처리(Asynchronous) - 병렬적인 업무처리

---
# ==코드 수준== 에서의 차이 확인
---
# 실습에 사용할 함수 두 가지
- fs.readdirSync(path[, options])

- fs.readFile(file[, options], callback)


<br><br> # Node.js Document 확인


---
# 코드 수준 에서의 차이 확인
한 폴더 안에 `text.txt` 파일과 `sync.js` 파일을 만들어주시기<br> 바랍니다.
text.txt 파일의 내용을 채워주셔야 합니다.

```
//sync.js 의 코드
var fs = require('fs');

//1번 readfileSync
console.log('A');
var result = fs.readFileSync('text.txt','utf8');
console.log(result);
console.log('B');

//2번 readfile
console.log('A');
fs.readFile('text.txt' , 'utf8', function(err, result){
    console.log(result);
});
console.log('B');
```
---
# 코드 수준 에서의 차이 확인
`node sync.js` 의 결과는 다음과 같습니다.

```
//실행결과

A
description                 //synchronous
B

A
B                           //asynchronous
description

```
---
<h1> 관련된 다른 개념 </h1>

- Blocking I/O 
- Non - Blocking  I/O
- Concurrency & Parallelism
---
# Blocking I/O
I/O 작업이 진행되는 동안 유저 프로세스는 자신의 작업을 중단한 채 대기해야한다.
<center><img src = "C:\Users\wodnj\Documents\GitHub\2018_node_js_study\Lecture\Week 2\Blocking.PNG" width = 500% height = 500%></img></center>

---

# Non-Blocking I/O
Blocking 방식과 달리 I/O 작업을 진행하는 동안 유저 프로세스의 작업을 중단시키지 않는 방식이다.
<center><img src = "C:\Users\wodnj\Documents\GitHub\2018_node_js_study\Lecture\Week 2\Non-Blocking.PNG" width = 500% height = 500%></img></center>

---
# Concurrency & Parallelism
- Concurrency : 동시성 , 하나의 작업자가 여러 개의 작업을 번갈아 가며 수행하는 구조
- Parallelism : 병렬성 , 여러 명의 작업자가 여러 개의 작업을 동시해 수행하는 구조


※ 두 개념은 서로 독립적이며, 동시 확보함으로써 시너지 효과를 가져올 수 있다. 

---

# Node.js Study - 2주차 과제
동기 방식에서 비동기 방식으로 전환하기
```
var fs = require('fs');

var filenames = fs.readdirSync('.');  
var i;  
for (i = 0; i < filenames.length; i++) {  
    console.log(filenames[i]);
}
console.log('ready');

console.log('can process next job...');
```
---
# Node.js Study - 2주차 과제
상세설명

- 동기방식 API에 대응하는 비 동기방식 API로 교체하기
- 동기방식 API의 호출 이후 처리 로직을 그대로 Callback 함수에 옮기기
- 출력되는 결과값의 차이를 서술할 것
