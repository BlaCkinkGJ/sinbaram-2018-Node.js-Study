
var a = [ 3 , 1 , 2 ];

//익명함수를 반환하는 함수
function Reverse_sort(name) {
    var output = a.sort(function(v1,v2){
        return v2 - v1;
    });
    return function () {
        console.log(output);
    };
}
 
Reverse_sort('Mickey')();