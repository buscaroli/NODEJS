const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
   try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token);
    // console.log(decoded);
    const user = await User.findOne({_id: decoded._id , 'tokens.token': token });
    if (!user) {
        throw new Error; // if we throw an error here, the catch error down below will fire up
    }

    req.token = token;
    req.user = user; // saving that the user has been authenticated
    next();

   } catch (e) {
    res.status(401).send({error: 'Not authenticated.'});
   }
};

module.exports = auth;