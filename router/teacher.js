const express = require('express');
const router = express.Router();
const Teacher = require("../model/teachers.js");
const bcrypt = require('bcrypt');


router.get("/login",(req,res)=>{
    res.send(`
        <form action="/teacher/login" method="post">
          <div>
            <label for="email">email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
      `);
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find teacher by email
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Create JWT token
        res.redirect(`/teacher/${teacher._id}/home`);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get("/:teacherId/home",(req,res)=>{
  let {teacherId}=req.params;
  res.send(`
     <header>
        <h1>Welcome to the Teacher Dashboard</h1>
        <nav>
            <ul>
                <li><a href="/profile">Profile</a></li>
                <li><a href="teacher/${teacherId}/teacher/uploadMarks">Upload Marks</a></li>
                <li><a href="/teacher/${teacherId}/markAttendence">mark attendence</a></li>
            </ul>
        </nav>
    </header>
    `);
});

router.get("/uploadMarks",(req,res)=>{
  res.send("here you will get the form to upload marks");
});


router.get("/:teacherId/markAttendence",async(req,res)=>{
  let {teacherId}=req.params;
  let teacher=await Teacher.findById(teacherId);
  let subjects=await Subject.find({teachers:teacherId});
 
 console.log(teacher);
  console.log("subjects");
  console.log(subjects);
  res.send(`
     <form action="/submit" method="post">
        <!-- Date Selection -->
        <label for="date">Select Date:</label>
        <input type="date" id="date" name="date" required><br><br>
        
        <!-- Section Selection -->
        <label for="section">Select Section:</label>
        <select id="section" name="section" required>
            <option value="" disabled selected>Select a section</option>
            <option value="section1">Section A</option>
            <option value="section2">Section B</option>
            <option value="section3">Section C</option>
            <option value="section3">Section D</option>
            <!-- Add more sections as needed -->
        </select><br><br>
        
        <!-- Subject Selection -->
        <label for="subject">Select Subject:</label>
        <select id="subject" name="subject" required>
            <option value="" disabled selected>Select a subject</option>
            <option value="subject1">Subject 1</option>
            <option value="subject2">Subject 2</option>
            <option value="subject3">Subject 3</option>
            <!-- Add more subjects as needed -->
        </select><br><br>
        
        <!-- Submit Button -->
        <button type="submit">Submit</button>
    </form>
    `);
})

module.exports = router;