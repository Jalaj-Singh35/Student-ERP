const express = require('express');
const mongoose = require('mongoose');

const adminRoutes = require('./router/admin.js');
const teacherRoutes=require("./router/teacher.js");
const studentRoutes=require("./router/student.js");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


main().then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/erpDatabase');
}


app.use('/admin', adminRoutes);
app.use("/teacher",teacherRoutes);
app.use("/student",studentRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
