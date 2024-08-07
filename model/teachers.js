const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true // Make sure to hash this password before saving
    },
    department: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    // Add more fields as necessary
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;