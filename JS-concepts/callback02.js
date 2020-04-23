const add = (a, b, fun) => {
    setTimeout(() => {
        fun (a + b);
    }, 3000);
    
}

add(5, 6, (sum) => {
    console.log(sum);
})

// -------------------------------- 

const first = (value, callback) => {
    callback(value + 10, false);
}

const second = (value, callback) => {
    callback(value + 10, false);
    // callback(value + 10, true);
}

const third = (value, callback) => {
    callback(value + 10, false);
}

first(1, (result1, error) => {
    if (error) {
        return console.log('Error: first.');
    }
    second(result1, (result2, error) => {
        if (error) {
            return console.log('Error: second.');
        }
        third(result2, (result3, error) => {
            if (error) {
                return console.log('Error: third.');
            }
            console.log('Total result: ' + result3);
        })
    })
});