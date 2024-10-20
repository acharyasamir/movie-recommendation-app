const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Define the user schema for storing user data
const userDetails = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userDetails);

module.exports = User;
