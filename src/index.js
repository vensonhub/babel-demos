//function Point(x,y){
//    this.x = x;
//    this.y = y;
//}
//
//Point.prototype.toString = function () {
//    return '(' + this.x + ', ' + this.y + ')';
//}

// rest
function restFunc(a, ...rest) {
    console.log(a)
    console.log(rest)
}
restFunc(1);
restFunc(1, 2, 3, 4);