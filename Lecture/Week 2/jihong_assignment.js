const fs = require('fs');

function myReadDirAsync(pathName, callback) {
    //next tick을 사용한 이유는 callback함수를 event loop로 밀어넣기 위해 사용하는 함수가 nextTick, setTimeout, setImmediate 가 있는데,
    //공통점은 event loop의 바로 다음 tick에서 실행되는 것이며, 차이점은 우선순위입니다. 이름으로 보면 세번째의 setImmediate가 첫번째로 실행될 것 같지만 nextTick이 제일 먼저 실행됩니다.
    //특정 코드가 event loop tick의 시작시점에서 가장 먼저 실행되기를 원한다면 nextTick을 사용해야 한다고 합니다. 뭔지 잘 모르겠지만 사용해봤습니다 ㅎㅎ..
    process.nextTick(function() {
        try {
            let data = fs.readdirSync(pathName);
            callback(null, data);
        }
        catch (err) {
            let error = new Error("invalid path name");
            callback(error, null);
        }
    });
}

myReadDirAsync('.', (err, data) => {
    if (err) throw err;
    for (idx in data) 
        console.log(data[idx]);
});
console.log('ready');
console.log('can process next job...');

//Synchronous 버전과 달리 아래의 ready, can process next job... 이 먼저 출력되고 그다음에 현재 디렉토리의 파일목록이 출력됩니다.

//아래는 nextTick, setTimeout, setImmediate의 우선순위를 보는 코드입니다.

function fn(msg) {
    return f;

    function f() {
        let m = msg;
        console.log(m);
    }
}

setImmediate(fn('set immediate'));
process.nextTick(fn('next tick'));
setTimeout(fn('set timeout'), 0);