const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attendence=require("./attendence.js");
const Subject=require("./subject.js");


const studentSchema = new Schema({
    name: {
        type:String,
        ref:"User"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
   
    
    department: {
        type: String,
       
    },
    attendence:{
        type:Schema.Types.ObjectId,
        ref:"Attendence",
    },
    subjects:[
        {
            type:Schema.Types.ObjectId,
            ref:"Subject",
        }
    ]
});

const Student=mongoose.model("Student",studentSchema);
module.exports=Student;