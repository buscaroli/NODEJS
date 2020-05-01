const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body); // solution before auth, getting the body
    const task = new Task({             // solution after auth:
        ...req.body,                    // 1. getting the body but the owner
        owner: req.user._id             // 2. getting the owner
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }
    
});


router.get('/tasks', auth, async (req, res) => {
    try{
        // const tasks = await Task.find({});                       // before auth
        // const task = await Task.findOne({ owner: req.user._id}); // after auth: 1st way of doing it
        await req.user.populate('tasks').execPopulate();            // after auth: 2nd way of doing it
        res.send(req.user.tasks);
    }catch(e) {
        res.status(500).send(e);
    }

});


router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    
    try{
        // const task = await Task.findById({_id});                     // before auth
        const task = await Task.findOne({ _id, owner: req.user._id });  // after auth
        
        if (!task){
            return res.status(404).send();
        }
        res.send(task);

    } catch(e) {
        req.status(500).send(e);
    }
});


router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const _updatedDetails = req.body;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((prop) => {
        return allowedUpdates.includes(prop);
    });

    if (!isValidOperation) {
        return res.send({ error: 'Invalid Update.' });
    }

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        await task.save();

        updates.forEach((prop) => {
            task[prop] = req.body[prop];
        })

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch(e) {
        res.status(400).send(e);
    }

})


router.delete('/tasks/:id', auth, async (req, res) => {
    
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task){
            res.status(404).send();
        }
        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;