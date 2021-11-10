const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    code:String,
    description:String,
    units:Number
},{versionKey:false});

const StudentSchema = new Schema({
    name: String,
    section: String,
    age: Number,
    subjects:[SubjectSchema]
},{versionKey: false});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;