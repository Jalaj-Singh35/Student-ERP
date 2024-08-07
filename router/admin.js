const express = require('express');
const router = express.Router();
const Teacher = require("../model/teachers.js");
const Student=require("../model/student.js");
const Subject=require("../model/subject.js");
const bcrypt = require('bcrypt'); // For hashing passwords

// Route to add a teacher
router.get("/addTeacher",(req,res)=>{
    res.send(`
        <form action="/admin/addTeacher" method="post">
          <div>
            <label for="email">email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="name">name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
            <div>
            <label for="department">department</label>
            <input type="text" id="department" name="department" required>
          </div>
            <div>
            <label for="mobileNumber">mobileNumber</label>
            <input type="text" id="mobileNumber" name="mobileNumber" required>
          </div>
          <button type="submit">add</button>
        </form>
      `);
})

router.post('/addTeacher', async (req, res) => {
    try {
        const { name, email, password, department, mobileNumber } = req.body;
        
        // Check if the teacher already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new teacher
        const newTeacher = new Teacher({
            name,
            email,
            password: hashedPassword,
            department,
            mobileNumber
        });

        await newTeacher.save();
        res.status(201).send({ message: 'Teacher added successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});


router.get("/addStudent",(req,res)=>{
  res.send(`
      <form action="/admin/addStudent" method="post">
        <div>
          <label for="email">email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div>
          <label for="name">name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
        </div>
        <div>
          <label for="year">year</label>
          <input type="number" id="year" name="year" required>
        </div>
          <div>
          <label for="department">department</label>
          <input type="text" id="department" name="department" required>
        </div>
         
        <button type="submit">add</button>
      </form>
    `);
})

router.post('/addStudent', async (req, res) => {
  try {
      const { name, email, password, department, year } = req.body;
      
      // Check if the teacher already exists
      const existingStudent = await Teacher.findOne({ email });
      if (existingStudent) {
          return res.status(400).json({ message: 'Student already exists' });
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create a new teacher
      const newStudent = new Student({
          name,
          email,
          password: hashedPassword,
          department,
          year,
      });
       
      let subjects=await Subject.find({department,year});
      newStudent.subjects=subjects.map(subject=>subject._id);

      await newStudent.save();

      res.status(201).send({ message: 'Student added successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Server error', error });
  }
});


module.exports = router;