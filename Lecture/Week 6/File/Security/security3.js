// 단방향 해시
const md5 = require('md5');

const data = [{
    name: "FO",
    password: '363818613781a0d3f02be4288ea17a65',
    salt: '@!$@!%!51259128!@$!@$'}, 
    {
    name: "BO",
    password: '363818613781a0d3f02be4288ea17a65',
    salt: '234951259128!@$!@$'
}];

let input = "1q2w3e4r";

for(let i = 0; i < data.length; i++){
    console.log(data[i]['password'] === md5(input+data[i]['salt']));
}

// htts://crackstation.net