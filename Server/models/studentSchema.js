var mongoose = require('mongoose')

var studentSchema = new mongoose.Schema({
    ID: Number,
    FullName: String,
    Email: String,
    Faculty: String,
    Birthday: Date,
    Grades: [{
        DateOfExame: Date,
        Grade: Number
    }]
})

module.exports = mongoose.model('student',studentSchema)