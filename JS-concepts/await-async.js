// AWAIT-ASYNC
// How to tidy up coding with promises

const add = (a, b) => {
	return new Promise ((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000)
	})
};

// Code is much tydier than with promise chaining and also i have
// the advantage that the constants sum, sum2, sum3... are all 
// available within the scope of doSums; in order to do the same
// within a promise chaining I woould have to resort to create 
// temporary variable to reassign the value of the variable from
// the previous scope and it would look very messy, more prone
// to error, more difficult to understand, maintain and to debug.
const doSums = async () => {
    const sum  = await add(5, 10);
    const sum2 = await add(sum, 15);
    const sum3 = await add(sum2, 20);
    const sum4 = await add(sum3, 50);
    return sum4;
}

doSums().then((sum) => {
    console.log('The Sum is ', sum);
}).catch((e) => {
    console.log('Error: ', e);
});