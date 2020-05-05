/* Inside /config/dev.env create a list of all the enn variable you want to be
    able to access through process.env.NAME.
    You should have:    PORT
                        SENDGRID_API_KEY
                        JWT_SECRET
                        MONGODB_URL

*/

const express = require('express');
require('./db/mongoose');   // we are not requesting anything, we are just ensuring
                            // that the file runs so mongoose can connect to the database.
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT;


const multer = require('multer'); 
const upload = multer ({
    dest: 'images'
});
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});



// Starting the server:
app.listen(port, () => {
    console.log('Server up on port ' + port);
});