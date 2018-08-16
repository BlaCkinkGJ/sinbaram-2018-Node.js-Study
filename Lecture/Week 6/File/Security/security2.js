// 단방향 해시
const md5 = require('md5');

const salt = "@!$@!%!51259128!@$!@$"
const data = {
    name: "FO",
    password: '363818613781a0d3f02be4288ea17a65'
}

let input = "1q2w3e4r";

console.log(data['password'] === md5(input+salt));

// htts://crackstation.net