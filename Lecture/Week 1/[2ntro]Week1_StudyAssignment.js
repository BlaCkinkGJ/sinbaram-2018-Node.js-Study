
var a = [ 3 , 1 , 2 ];


    var output = a.sort(function(v1,v2){
        return v2 - v1;
    });
    
    console.log(output);

///
function b(){
    return (v1, v2)=>{
        return v2 - v1;
    }
}


a.sort(b());

/// 결과 = [3, 2 , 1]