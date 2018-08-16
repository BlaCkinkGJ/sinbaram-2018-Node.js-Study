// 단방향 해시
const md5 = require('md5');

const data = {
    name: "FO",
    password: '5416d7cd6ef195a0f7622a9c56b55e84'
}

let input = "1q2w3e4r";

console.log(data['password'] === md5(input));

// htts://crackstation.net