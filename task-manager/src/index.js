const express = require('express');
require('./db/mongoose');   // we are not requesting anything, we are just ensuring
                            // that the file runs so mongoose can connect to the database.
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3000;

// Starting the server:
app.listen(port, () => {
    console.log('Server up on port ' + port);
});