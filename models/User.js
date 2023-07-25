const mongoose = require('mongoose');
const { Schema } = mongoose

const mongoURI = 'mongodb://127.0.0.1:27017/news?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1'

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("failed");
    })


//schema for user data
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})
const collection = mongoose.model('user', UserSchema);

module.exports = collection;
