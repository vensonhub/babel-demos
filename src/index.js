//import "babel-polyfill";
//
//console.log(Array.from('aaaa'));
//
//const sum = (a,b)=>a+b;
//
//let x = sum(1,2);
//
//console.log("babel:"+x);

const Template = {
    test: function(){
        console.log(this);
        $('#event').on('click',()=>{
            // 大家觉得这个 this 是什么
            console.log(this);
        });
    }
};
Template.test();