const express = require('express');
const router = express.Router();
const Student = require("../model/teachers.js");
const bcrypt = require('bcrypt');


router.get("/login",(req,res)=>{
    res.send(`
        <form action="/student/login" method="post">
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
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Create JWT token
        res.send("hello u are logged in");
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

router.get("/home",(req,res)=>{
  res.send(`
     <header>
        <h1>Welcome to the student Dashboard</h1>
    </header>
    `);
});

module.exports = router;