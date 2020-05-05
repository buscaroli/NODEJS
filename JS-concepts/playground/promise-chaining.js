// USING PROMISE CHAINING TO IMPROVE READIBILITY OF CODE WHEN
// HAVING TO QUERY A COLLECTION MULTIPLE TIMES.
// See ../JS-Concepts/promise02.js

require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');


// Finding an user by ID , updating the age to 24 and returning the number 
// of documents whose age is 24
User.findByIdAndUpdate('5ea1e52c1388390871d5a823', {age: 24}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 24});
}).then((nums) => {
    console.log(nums);
}).catch((e) => {
    console.log(e);
});


// Same with Tasks: finding a task by ID, deleting the document
// and returning the number of completed documents

Task.findByIdAndDelete('5ea572916d845d0b6da412ae').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: true});
}).then((nums) => {
    console.log(nums);
}).catch((e) => {
    console.log(e);
});
