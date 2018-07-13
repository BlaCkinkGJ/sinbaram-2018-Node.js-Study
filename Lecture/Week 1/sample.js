function outerFunction(name) {
    var output = 'Hello' + name + '!';
    return function () {
        console.log(output);
    };
}
 
outerFunction('Mickey')();