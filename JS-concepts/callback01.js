// const myFunc = () => {
//     console.log('I am the callback function passed to setTimeOut!');
// };

// console.log('Starting...');
// setTimeout(myFunc, 2000);
// console.log('The End');

const add = (a, b, callback) => {
    console.log('Crunching numbers...');
    setTimeout(()=>{
        
        callback(a + b);
    }, 2000);
}

add(5, 6, (result) => {
    console.log(result);
});