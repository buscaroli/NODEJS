// I have prepared three functions (named first, second and third)
// that simply add the number 10 to the argument passed to them.
const first = (x) => {
    return x + 10;
}

const second = (x) => {
    return x + 10;
}

const third = (x) => {
    return x + 10;
}

// With a Promise I can chain different functions and also chain 
// what to do in case something fails within one of the functions.
// Consider that promises are mostly used (like callbacks) for
// async calls.

// This promise simulates the use of an async call by using
// setTimeout().
// In case we get back something, we call the 'resolve' function,
// otherwise if we came across an error we call the 'reject' function:
// what we return through them is then usen within the call chain
// through 'then' and 'catch'.
const promise = new Promise((resolve, reject) => {
    console.log('Crunching numbers...');
    setTimeout(() => {
        resolve(1);
        // reject('unknown error');
    }, 2000);
    
});

// Mind than in this case the promise chain is not as tidy as the one
// in the expample that will follow.
//
// I am chaining all the function together and I am including 
// the function to be executed within the chain:
//
// promise.then(first).then(second).then(third).then((response) => {
//     console.log(response);
// }).catch((error) => {
//     console.log('Error: ' + error);
// });


// In this second example I make the code cleaner by using two
// (handler) functions: I prepare the (handler) functions
// beforehand and I just chain them.

const okFunHandler = (x) => {
    console.log('OK Function: ' + x);
}

const failFunHandler = (x) => {
    console.log('Error: ' + x);
}

promise.then(first)
       .then(second)
       .then(third)
       .then(okFunHandler)
       .catch(failFunHandler);