const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');


const router = new express.Router();

// Create one user: Sign Up
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);        // We are creating the user, we just created
        const token = await user.generateAuthToken();   // the instance (user) and that's why we use
        res.status(201).send({ user, token });          // user.email and user.name. If we deal with
    } catch(e){                                         // a route where the user IS AUTHENTICATED
        res.status(400).send(e);                        // we can access them via req.user.email and
    }                                                   // req.user.name

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
        sendCancellationEmail(req.user.email, req.user.name); // Deleting the user require them to be
        res.send(req.user);                                   // authenticated, so we can access them 
    } catch(e) {                                              // via req.user.email and req.user.name
        res.status(500).send();
    }
});

// Upload Profile Picture using multer (setup):
const upload = multer({
    // dest: 'avatars',     // removing the dest option makes multer pass the file data
                            // to the function in the router so it can be used. No need
                            // to save files in the HDD anymore, also consider that the 
                            // way Heroku works, wipes out all the data everytime!
    limits: {               
        fileSize: 1024000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png)$/)){
            return cb(new Error('Wrong file type.'))
        }
        cb(undefined, true);
    }
});


// Router for Uploading Avatar picture (using multer):
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //                                    // Before using sharp:
    // req.user.avatar = req.file.buffer; //req.file.buffer contains the file. It is only 
    //                                    // available when the dest option in multer is disabled.
    const buffer = await sharp(req.file.buffer).resize({width: 240, height: 240}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

// Router for Deleting avatar:
router.delete('/users/me/avatar', auth, async (req, res) => {
    
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
    
});


// Serving the User's Avatar:
router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);

    } catch(e) {
        res.status(404).send();
    }
    
});

module.exports = router;