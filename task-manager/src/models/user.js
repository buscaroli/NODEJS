const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({    // <- the object is passed directly into the Schema
    name: {                                 // so we can add some functionality to our code.
        type: String,                       // See the commented code below for further info.
        default: 'Anonymous',               // Then we can user <nameOfSchema>.pre or <nameOfSchema>.post
        trim: true                          // to do something respectively before or after an event.
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,       // <- if added later, the DB needs to be destroyed and recreated
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
    },
    tokens: [{
        token: {
           type: String,
           required: true 
        }    
    }]
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

// Adding statics and methods:
// Schema Statics are methods that can be invoked directly by a Model (unlike Schema 
// Methods, which need to be invoked by an instance of a Mongoose document).
// eg Statics: User.myMethodInvokedOnSchema()
//    Methods: user.myMethodThatWorksOnThisInstance()
// Methods change something in the user itself, in this case we wanted to
//         add a token.
// Statics are methods that can be applied to every Document, in this case
//         we wanted to create a method to look for Documents by Email
//         and Password as such method wasn't included in Mongoose's 
//         (unlike others such as findOne, findById, findByIdAndDelete ...).


// Adding own query: findByEmailAndPassword()
userSchema.statics.findByEmailAndPassword = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error ('Access denied.');
    }

    const isMatch = await bcrypt.compare(password, user.password);   
    if (!isMatch) {
        throw new Error ('Access denied.');
    }
    
    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'mypassword');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};


const User = mongoose.model('User', userSchema);


module.exports = User

