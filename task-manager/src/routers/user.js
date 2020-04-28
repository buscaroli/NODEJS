const express = require('express');
const User = require('../models/user');
const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch(e){
        res.status(400).send(e);
    }

});


router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({});
        res.send(users);
    } catch(e) {
        res.status(500).send(e);
    }
    
});


router.get('/users/:id', async (req, res) => {                      
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        } 
        res.send(user);
    } catch(e) {
        res.status(500).send(e);
    }

});


router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
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
        // The following line needs to be changed in order to bypass some limitations in 
        // running some middleware, eg the one used to hash the password before saving the user.
        // const user = await User.findByIdAndUpdate(_id, _updatedDetails, { new: true, runValidators: true });
        
        // The folowing 4 lines of code are the replacement for the previous one. We are going to
        // findById, then we apdate the property using a loop (in this case forEach), and then we
        // save the user.
        // This is because some of mongoose queries likevfindByIdAndUpdate() bypass some advanced 
        // features like middleware.
        // See here: https://stackoverflow.com/questions/56844933/why-does-findbyidandupdate-bypasses-mongoose-middleware
        
        const user = await User.findById(_id);
        updates.forEach((prop) => {
            user[prop] = req.body[prop];
        })
        await user.save();
        
        if (!user) {
            return res.status(404).send();
        } 
        res.send(user);
    } catch(e) {
        res.status(400).send(e); // ideally we should handle both 400 and 500
    }

})


router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(500).send(e);
    }
});


module.exports = router;