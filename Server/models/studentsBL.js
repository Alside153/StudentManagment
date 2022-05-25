var studentSchema = require('./studentSchema')


const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        studentSchema.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const getByIdStudent = (id) => {
    return new Promise((resolve, reject) => {
        studentSchema.findById(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                if(data !== null) {
                    resolve(data)
                }
                else{
                    resolve("the student is not found")
                }
            }
        })
    })
}

const getMerchantById = (id) => {
    return new Promise((resolve, reject) => {
        merchant.findById(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                if(data !== null) {
                    resolve(data)
                }
                else{
                    resolve("the merchant is not found")
                }
            }
        })
    })
}

const createStudent = (newStudent) => {
    return new Promise((resolve, reject) => {
        var studentToAdd = new studentSchema({
            FullName: newStudent.FullName,
            Email: newStudent.Email,
            Faculty: newStudent.Faculty,
            Birthday: newStudent.Birthday,
            Grades: newStudent.Grades
        })

        studentToAdd.save((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(studentToAdd)
            }
        })
    })
}

const updateStudent = (id, studentToUpdated) => {
    return new Promise((resolve, reject) => {
        var studentToUpdate = {
            FullName: studentToUpdated.FullName,
            Email: studentToUpdated.Email,
            Faculty: studentToUpdated.Faculty,
            Birthday: studentToUpdated.Birthday,
            Grades: studentToUpdated.Grades
        }

        studentSchema.findByIdAndUpdate(id, studentToUpdate, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("student was updated!")
            }
        })
    })
}

const deleteStudent = (id) => {
    return new Promise((resolve, reject) => {
        studentSchema.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("Student was deleted!!!")
            }
        })
    })
}

module.exports = {getAllStudents, getByIdStudent, createStudent, updateStudent, deleteStudent};