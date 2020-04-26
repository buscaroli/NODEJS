const express = require('express');
require('./db/mongoose');   // we are not requesting anything, we are just ensuring
                            // that the file runs so mongoose can connect to the database.
const User = require('./models/user');
const Task = require('./models/task');


const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// USERS

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        // res.status(400);
        // res.send(e);
        res.status(400).send(e);
    })
});


app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)  //status(200) is sent by default
    }).catch((e) => {
        res.status(500).send(e);
    })
});


app.get('/users/:id', (req, res) => {
    //console.log(req.params); // req.params contains the parameter sent to the
                               // the server (what comes after localhost:3000/users/)                        
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
        
    }).catch((e) => {
        res.status(500).send(e);
    })

});

// TASKS

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch(() => {
        res.status(500).send(e);
    })

});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    
    Task.findById({_id}).then((task) => {
        if (!task){
            return res.status(404).send();
        }
        res.send(task);

    }).catch((e) => {
        req.status(500).send(e);
    })
});


// STARTING SERVER

app.listen(port, () => {
    console.log('Server up on port ' + port);
});