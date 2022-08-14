const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


module.exports.register = async (req, res) => {

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    user.image = req.file.path;
    await user.save();

    const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '7d' }
    );

    res.json({
        userId: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        token
    });
}

module.exports.login = async (req, res) => {

    const user = await User.findOne({ username: req.body.username });

    const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '7d' }
    );

    res.json({
        userId: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        token
    });
}