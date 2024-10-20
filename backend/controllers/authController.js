const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing fields in the request' });
    }

    try {
        const existingUsername = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUsername) {
            return res.status(400).json({ error: 'Username exists. Try another.' });
        }

        if (existingEmail) {
            return res.status(400).json({ error: 'Email exists. Try another.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        return res.status(201).json({ message: 'User Registered Successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering user.', details: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { id: user._id, username: user.username };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({ accessToken });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).send('User Logged Out!');
};
