// pbkdf2-password
const pbkdf2 = require('pbkdf2-password');
const hasher = pbkdf2();
// const md5 = require('md5');

let input = "1q2w3e4r";

hasher({password: input}, (err, pass, salt, hash)=>{
    console.log(err, pass, salt, hash)
});

/*
 pass : salt 값
 hash : 단 방향 결과 값
 */

const data = {
    name: "FO",
    password: 'a+s7GvKWKvY87wunFilgRSZzAUhaJApkXOcpTbXKOyZXrQJOz7ZNT7sX/RRfkV29C2W0BD935H9ZFnXOXRaiOkqsuRnaZmVpZSQ41VWiUGwm7ZbfYk+Ihnu7OrLJkg0TO4Y7PGRjYO7TtKQmmgrhzy8BL9zbEhxfVlm6FC2s1Pg=',
    salt: 'XEXTZvSnaEfDFbwvP2E/usD4eD2uSxWwouV85hOwEFm8Fl0LllBDlRirD11LdsdZpimq3MuSFxMHSA+ZErDsVQ==',
}


hasher({password:input, salt:data['salt']}, (err, pass, salt, hash)=>{
    console.log(hash === data['password'])
});