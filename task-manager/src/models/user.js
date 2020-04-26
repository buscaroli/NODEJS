const mongoose = require('mongoose');
const validator = require('validator');


const User = mongoose.model('User', {
    name: {
        type: String,
        default: 'Anonymous',
        trim: true
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

module.exports = User