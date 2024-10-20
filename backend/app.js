const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

// Use Routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Recommendation App');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
