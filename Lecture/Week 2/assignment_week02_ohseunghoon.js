var fs = require('fs');

fs.readdir('.',(err, result)=>{
    if(err) throw err;
    result.forEach((element)=>console.log(element));
});
console.log('ready');

console.log('can process next job...');

//ready -> 'can process next job' -> dir list 순으로 출력되게 변경되었음