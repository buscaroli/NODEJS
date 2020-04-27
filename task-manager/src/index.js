const express = require('express');
require('./db/mongoose');   // we are not requesting anything, we are just ensuring
                            // that the file runs so mongoose can connect to the database.
const User = require('./models/user');
const Task = require('./models/task');


const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// USERS USERS USERS USERS USERS ****************************

// Before refactoring: using promise chaining
// app.post('/users', (req, res) => {
//     const user = new User(req.body);
//
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         // res.status(400);
//         // res.send(e);
//         res.status(400).send(e);
//     })
// });


// Refactored with async-await:
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch(e){
        res.status(400).send(e);
    }

});

// Before refactoring:
// app.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)  //status(200) is sent by default
//     }).catch((e) => {
//         res.status(500).send(e);
//     })
// });

// Refactored using async-await:
app.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({});
        res.send(users);
    } catch(e) {
        res.status(500).send(e);
    }
    
});

// Before Refactoring
// app.get('/users/:id', (req, res) => {
//     //console.log(req.params); // req.params contains the parameter sent to the
//                                // the server (what comes after localhost:3000/users/)                        
//     const _id = req.params.id;
//
//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//       
//     }).catch((e) => {
//         res.status(500).send(e);
//     })
//
// });

app.get('/users/:id', async (req, res) => {                      
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

app.patch('/users/:id', async (req, res) => {
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
        const user = await User.findByIdAndUpdate(_id, _updatedDetails, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        } 
        res.send(user);
    } catch(e) {
        res.status(400).send(e); // ideally we should handle both 400 and 500
    }

})

// Delete one user:
app.delete('/users/:id', async (req, res) => {
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



// TASKS TASKS TASKS TASKS TASKS ***********************

// Before Refactoring:
// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body);
//
//     task.save().then(() => {
//         res.status(201).send(task);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// });

// Refactored with async-await:
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    }
    
});

// Before Refactoring:
// app.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => {
//         res.send(tasks);
//     }).catch((e) => {
//         res.status(500).send(e);
//     })
//
// });

// Refactored with async-await:
app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(e) {
        res.status(500).send(e);
    }

});


// Before refactoring:
// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id;
//    
//     Task.findById({_id}).then((task) => {
//         if (!task){
//             return res.status(404).send();
//         }
//         res.send(task);
//
//     }).catch((e) => {
//         req.status(500).send(e);
//     })
// });

// Refactored with async-await:
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findById({_id});
        if (!task){
            return res.status(404).send();
        }
        res.send(task);

    } catch(e) {
        req.status(500).send(e);
    }
});

// Update one task
app.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findByIdAndUpdate(_id, _updatedDetails, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch(e) {
        res.status(400).send(e);
    }

})

// Delete one task
app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task){
            res.status(404).send();
        }
        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    }
});


// STARTING SERVER

app.listen(port, () => {
    console.log('Server up on port ' + port);
});