const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const Teacher=require("./teachers.js");

const subjectSchema = new Schema({
  department: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  totalLectures: {
    type: Number,
    default: 30,
  },
  year: {
    type: Number,
    required: true,
  },
  teachers:[
    {
        type:Schema.Types.ObjectId,
        ref:"Teacher",
    }
  ]
});
 
Subject=mongoose.model("Subject",subjectSchema);

module.exports =Subject;
 