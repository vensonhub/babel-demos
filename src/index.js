import "babel-polyfill";

console.log(Array.from('aaaa'));

const sum = (a,b)=>a+b;

let x = sum(1,2);

console.log("babel:"+x);