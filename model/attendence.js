const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;
const Subject=require("./subject.js");

const attendanceSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
  },
  totalLectures: {
    type: Number,
    default: 20,
  },
  lecturesAttended: {
    type: Number,
    default: 0,
  },
});

module.exports =
  mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);