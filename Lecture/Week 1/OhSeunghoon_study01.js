a = [3, 1, 2];
a.sort((a, b)=>{return b-a});
console.log(a);

b = [3, 1, 2, 5, 4];
function msort() {
    return (i,j)=>{return j-i};
}
b.sort(msort());
console.log(b);
