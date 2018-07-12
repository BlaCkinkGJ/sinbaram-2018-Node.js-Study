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
# 노드의 비동기 입출력 방식
하나의 요청 처리가 끝날 때 까지 기다리지 않고
다른 요청을 동시에 처리할 수 있는 비동기 입출력 방식을 적용

---
# 노드의 비동기 입출력 방식

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
# 과제
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
# 과제
상세설명

- 동기방식 API에 대응하는 비동기방식 API로 교체하기
- 동기방식 API의 호출 이후 처리 로직을 그대로 Callback 함수에 옮기기
- 출력되는 결과값의 차이를 서술할 것
- fs.readdir 이용
