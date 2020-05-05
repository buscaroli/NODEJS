// REPLACING PROMISE CHAINING WITH AWAIT-ASYNC
// REFACTORING CODE FROM promise-chaining.js
// See ../JS-Concepts/promise02.js and ../JS-Concepts/await-async.js

require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');


// Example with Promise Chaining:
// User.findByIdAndUpdate('5ea1e52c1388390871d5a823', {age: 24}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 24});
// }).then((nums) => {
//     console.log(nums);
// }).catch((e) => {
//     console.log(e);
// });

// Example with async-await:
const updateAndCount = async (id, age) => {
    // const user = await User.findByIdAndUpdate(id, { age });
    await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAndCount('5ea1e52c1388390871d5a823', 24).then((nums) => {
    console.log('Users with age of 24: ', nums);
}).catch((e) => {
    console.log(e);
});

// REFACTORING THE CODE RELATED TO THE TASK COLLECTION:

// OLD CODE USING PROMISE CHAINING:
// Task.findByIdAndDelete('5ea572916d845d0b6da412ae').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: true});
// }).then((nums) => {
//     console.log(nums);
// }).catch((e) => {
//     console.log(e);
// });

// CODE REFACTORED USING ASYNC-AWAIT:
const deleteAndCount = async (id) => {
    // const task = await Task.findByIdAndDelete(id);
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: true });
    return count;
}

deleteAndCount('5ea572916d845d0b6da412ae').then((nums) => {
    console.log('Completed task(s): ', nums);
}).catch((e) => {
    console.log('Error: ', e);
});