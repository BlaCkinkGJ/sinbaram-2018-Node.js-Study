var fs = require('fs');

fs.readdir('.', function(error, files) {
if (error) { console.log(error); throw error;}

else {console.log(files);}
});


var filenames = fs.readdirSync('.');

var i;

for (i = 0; i < filenames.length; i++) {
  console.log(filenames[i]);
}

console.log('ready');

console.log('can process next job...');


/*
동기방식 api에 대응하는 비동기방식 api로 교체할것
동기방식 api의 호출이후 처리 로직을 그대로 callback함수에 옮기기
출력되는 결과값의 차이를 서술할것
*/
