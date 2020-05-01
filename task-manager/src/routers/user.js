const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create one user: Sign Up
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch(e){
        res.status(400).send(e);
    }

});


// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByEmailAndPassword(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(e) {
        res.status(400).send(); // <- not sending anything, status will do
    }
});


// Log out (only logs out from the current device by removing the token used to
// login; eg if logging out from the laptop you won't be logged out from the phone).
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => { // it works because the user
            return token.token !== req.token;                 // would be authenticated so we
        });                                                   // already have access to req.user
        await req.user.save();                                // and req.token (no need to fetch
        res.send();                                           // that data again).
    } catch(e) {
        res.status(500).send();
    }
});


// Logout all users (log out from all the devices)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});


// Read all users
router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user);
});


// Update loggen in user
router.patch('/users/me', auth, async (req, res) => {
    const _id = req.user._id;
    const _updatedDetails = req.body;

    // The isValidOperation function is used to ensure the user is using
    // the functionality correctly.
    const updates = Object.keys(req.body); // array of available properties (eg name, age ...) 
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = updates.every((prop) => {
        return allowedUpdates.includes(prop);
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update.'});
    }

    try{
        updates.forEach((prop) => {
            req.user[prop] = req.body[prop];
        })
        await req.user.save();
        res.send(req.user);
    } catch(e) {
        res.status(400).send(e); // ideally we should handle both 400 and 500
    }
});


// Delete currently logged in user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(e) {
        res.status(500).send();
    }
});


module.exports = router;