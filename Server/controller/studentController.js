const express = require('express');
const studentsBL = require('../models/studentsBL')

const router = express.Router();

//GetAll
router.route('/').get(async (req, resp) => {
    var data = await studentsBL.getAllStudents();
    return resp.json(data);
})

//GetById
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id;
    var data = await studentsBL.getByIdStudent(id);
    return resp.json(data);
})

//Post
router.route('/').post(async (req, resp) => {
    var newStudent = req.body;
    var answer = await studentsBL.createStudent(newStudent);
    return resp.json(answer);
})

//Put
router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var studentToUpdate = req.body;

    await studentsBL.updateStudent(id, studentToUpdate);

    return resp.json("The update was successful");
})

//Delete
router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id
    await studentsBL.deleteStudent(id);

    return resp.json("The delete was successful");
})

module.exports = router;