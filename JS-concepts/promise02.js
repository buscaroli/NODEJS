// PROMISE CHAINING

// This is how a generic Promise works:
const add = (a, b) => {
	return new Promise ((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000)
	})
};

add(5, 10).then((sum) => {
	console.log(sum);
}).catch((e) => {
	console.log(e);
});

// Now we want to try to insert a promise inside another promise:
const add2 = (a, b) => {
	return new Promise ((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000)
	})
};

add2(2, 8).then((sum) => {
	console.log(sum);
	add(sum, 10).then((sum2) => {
		console.log(sum2);
	}).catch((e) => {
		console.log(e);
	})
}).catch((e) => {
	console.log(e);
});

// We can improve on that by chaining the two promises:
const add3 = (a, b) => {
	return new Promise ((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000)
	})
};

add3(30, 50).then((sum) => {
	console.log(sum);
	return add3(sum, 20)
}).then((sum2) => {
	console.log(sum2);
}).catch((e) => {
	console.log(e);
})