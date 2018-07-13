var a = [3, 1, 2];

a.sort((v1, v2) => {
    return v2 - v1;
});

console.log(a);

var a = [3, 1, 2];

function retCompFunc() {
    return function(v1, v2) {
        return v2 - v1;
    };
};

a.sort(retCompFunc());

console.log(a);