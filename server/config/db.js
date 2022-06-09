
const url = 'mongodb://127.0.0.1:27017';

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected...'.green.inverse);
    } catch (err) {
        console.error(err.message.red);
        process.exit(1);
    }
}

module.exports = connectDB;

