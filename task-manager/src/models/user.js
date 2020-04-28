const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({    // <- the object is passed directly into the Schema
    name: {                                 // so we can add some functionality to our code.
        type: String,                       // see the commented code below for further info.
        default: 'Anonymous',               // Then we can user <nameOfSchema>.pre or <nameOfSchema>.post
        trim: true                          // to do something respectively before or after an event.
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        validate(x) {
            if(!validator.isEmail(x)) {
                throw new Error('Email address not valid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate (x) {  
            if (x.toLowerCase().includes('password')){
                throw new Error ('Password can\'t contain \'password\'.');
            }
        }
    }
});

// We are passing the event (in this case save) and we are telling the schema
// to implement our functionality before the event (by using .pre).
// NOTE You can't use an arrow function because of the different behaviour
//      of the binding of 'this'.

// Bear in mind that some of mongoose queries like findByIdAndUpdate() bypass
// middleware, so they need to be swapped with something else inside routers/user.js.
userSchema.pre('save', async function(next) {
    const user = this;  // <- this is not necessary, it makes it easier to read
                        // you could jusr use this. as required.
    
    if (user.isModified('password')) {  // <- only true when user is first created or 
                                        // if the PW was updated.
        user.password = await bcrypt.hash(user.password, 8);                               
    }
    
    next();

})

const User = mongoose.model('User', userSchema);


module.exports = User

// Old Code before the introduction of Schema kept for reference:

// const User = mongoose.model('User', {   // <- when we pass an object to mongoose it converts it
//     name: {                             // into a Schema. We can create the Schema beforehand so
//         type: String,                   // we can use some middleware functionality, like the one
//         default: 'Anonymous',           // used for hashing the password.
//         trim: true                      
//     },
//     age: {
//         type: Number,
//         default: 0
//     },
//     email: {
//         type: String,
//         validate(x) {
//             if(!validator.isEmail(x)) {
//                 throw new Error('Email address not valid.')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 7,
//         validate (x) {
//             if (x.toLowerCase().includes('password')){
//                 throw new Error ('Password can\'t contain \'password\'.');
//             }
//         }
//     }
// });

