var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/studentsDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})